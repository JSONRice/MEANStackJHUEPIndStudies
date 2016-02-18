/***
 * OPTIONAL: reference additional vendor packages imported into index.ejs below
 * ui.view could be added here but currently ng-view is being used.
 */

var meanstacktutorials = angular.module('meanstacktutorials', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// calls the services to force pre-load:
/*
meanstacktutorials.run([
  'homeService',
  function (homeService) {
    // intentionally left blank
  }
]);
*/

// The following ensures that a user is logged in prior to any view being loaded.
// Restricted pages get re-routed back to the login view.
meanstacktutorials.run(function ($rootScope, $location, $route, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthenticationService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});


console.log('dependencies pre-loaded in public/javascript/app.js');

meanstacktutorials.config(['$routeProvider', function ($routeProvider) {
    console.log('meanstacktutorials.config > routing');
    
    // note: chain on additional routes with .when(...)
    // The default page loads from the root '/' and is index.html
    $routeProvider.when('/', {
      templateUrl: '../templates/login.html',
      controller: 'LoginController',
      access: {restricted: false}      
    }).when('/home', {
      templateUrl: '../templates/home.html',
      controller: 'LogoutController',
      access: {restricted: false}      
    }).when('/login', {
      templateUrl: '../templates/login.html', 
      controller: 'LoginController',
      access: {restricted: false}      
    }).when('/logout', {
      controller: 'LogoutController'
    }).when('/register', {
      templateUrl: '../templates/register.html', 
      controller: 'RegisterController',
      access: {restricted: false}      
    }).otherwise({
      redirectTo: '/login'
    });
  }]);

