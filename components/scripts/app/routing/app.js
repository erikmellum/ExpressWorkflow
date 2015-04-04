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
