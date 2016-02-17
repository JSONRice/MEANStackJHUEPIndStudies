/***
 * OPTIONAL: reference additional vendor packages imported into index.ejs below
 * ui.view could be added here but currently ng-view is being used.
 */

var meanstacktutorials = angular.module('meanstacktutorials', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// calls the services to force pre-load of data:
/*
meanstacktutorials.run([
  'homeService',
  function (homeService) {
    // intentionally left blank
  }
]);
*/


console.log('dependencies pre-loaded in public/javascript/app.js');

meanstacktutorials.config(['$routeProvider', function ($routeProvider) {
    console.log('meanstacktutorials.config > routing');
    
    // note: chain on additional routes with .when(...)
    // The default page loads from the root '/' and is index.html
    $routeProvider.when('/', {
      templateUrl: 'index.html',
      controller: 'IndexController'
    }).when('/home', {
      templateUrl: '../templates/home.html',
      controller: 'HomeController'
    }).when('/login', {
      templateUrl: '../templates/login.html', 
      controller: 'LoginController'
    }).when('/logout', {
      controller: 'LogoutController'
    }).when('/register', {
      templateUrl: '../templates/register.html', 
      controller: 'RegisterController'
    }).otherwise({redirectTo: '/'});
  }]);

