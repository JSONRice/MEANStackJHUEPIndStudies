/***
 * OPTIONAL: reference additional vendor packages imported into index.ejs below
 * ui.view could be added here but currently ng-view is being used.
 */

var meanstacktutorials = angular.module('meanstacktutorials', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ngAnimate', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// calls the services to force pre-load
// this is good for calling services (REST data fetches) prior to page loads
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
    
    // note: chain on additional route configs with .when(...)
    // The otherwise() (default) page loads from '/' and is the login page
    // All other pages should be restricted access besides the registration,
    // logout, and login pages.
    $routeProvider.when('/', {
      templateUrl: '../templates/login.html',
      controller: 'LoginController',
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
    })
      // NOTICE: The following route controller configurations are all restricted access
      // If you add a new config then make sure it's access is restricted.
      .when('/home', {
      templateUrl: '../templates/home.html',
      controller: 'HomeController',
      access: {restricted: true}      
    })    
      .otherwise({
      redirectTo: '/login'
    });
  }]);

