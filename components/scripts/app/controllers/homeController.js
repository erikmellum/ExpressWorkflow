var homeController = angular.module('homeController', []);

homeController.controller('HomeController', ['$scope','$http', function($scope, $http) {
  $scope.test = "about";
}]);
