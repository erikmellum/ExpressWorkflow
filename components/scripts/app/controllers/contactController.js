var contactController = angular.module('contactController', []);

contactController.controller('ContactController', ['$scope','$http', function($scope, $http) {
  $scope.test = "contact";
}]);
