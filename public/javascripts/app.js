var aboutController = angular.module('aboutController', []);

aboutController.controller('AboutController', ['$scope','$http', function($scope, $http) {
  $scope.test = "about";
}]);

var blogController = angular.module('blogController', []);

blogController.controller('BlogController', ['$scope','$http', function($scope, $http) {
  $scope.test = "blog";
}]);

var contactController = angular.module('contactController', []);

contactController.controller('ContactController', ['$scope','$http', function($scope, $http) {
  $scope.test = "contact";
}]);

angular.module('controllers',
[
  'mainController',
  'homeController',
  'aboutController',
  'blogController', 
  'contactController'
]);

var homeController = angular.module('homeController', []);

homeController.controller('HomeController', ['$scope','$http', function($scope, $http) {
  $scope.test = "about";
}]);

var mainController = angular.module('mainController', []);

mainController.controller('MainController', ['$scope','$http', function($scope, $http) {
  $scope.test = "main";
}]);

var directives = angular.module('directives', ['ngEnter', 'ngConfirm']);

var ngConfirm = angular.module('ngConfirm', []);
ngConfirm.directive('ngConfirm', function () {
  return {
    priority: -1,
    terminal: true,
    link: {
      pre:function (scope, element, attr) {
        var msg = attr.ngConfirm || "Are you sure?";
        element.bind('click',function () {
          if ( window.confirm(msg) ) {
            scope.$eval(attr.ngClick);
          }
        });
      }
  }
  };
});
var ngEnter = angular.module('ngEnter', []);

ngEnter.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) { //the user pressed enter
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});
var myApp = angular.module('myApp', ['ngRoute','controllers', 'directives']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'home',
    controller: 'HomeController'
  }).
    when('/about', {
    templateUrl: 'about',
    controller: 'AboutController'
  }).
    when('/blog', {
    templateUrl: 'blog',
    controller: 'BlogController'
  }).
    when('/contact', {
    templateUrl: 'contact',
    controller: 'ContactController'
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);

var service = angular.module('service', ['ngResource']);

service.factory('BlogPost', ['$resource',
  function($resource){
    return $resource('blogposts', {}, {
      find: {method:'GET', params:{postId: 'blogPost'}, isArray:true},
      //create: {method:'POST', params:{newIngredient: 'primitiveIngredients'}, isArray:true}
      //find: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
}]);
