var cleaningschedule = angular.module('cleaningschedule', [
  'ngRoute', 'ngSanitize', 'ngResource', 'ui.bootstrap',
  'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner'
]);

// calls the services to force pre-load of data:
/*
cleaningschedule.run([
  'homeService',
  function (homeService) {
    // intentionally left blank
  }
]);
*/


console.log('dependencies pre-loaded in public/javascript/app.js');

cleaningschedule.config(['$routeProvider', function ($routeProvider) {
    console.log('cleaningschedule.config > routing');

    // note: chain on additional routes with .when(...)
    $routeProvider.when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    }).otherwise({redirectTo: '/'});
  }]);

