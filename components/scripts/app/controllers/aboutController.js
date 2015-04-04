var aboutController = angular.module('aboutController', []);

aboutController.controller('AboutController', ['$scope','$http', function($scope, $http) {
  $scope.test = "about";
}]);
