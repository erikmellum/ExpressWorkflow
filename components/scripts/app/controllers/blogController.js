var blogController = angular.module('blogController', []);

blogController.controller('BlogController', ['$scope','$http', function($scope, $http) {
  $scope.test = "blog";
}]);
