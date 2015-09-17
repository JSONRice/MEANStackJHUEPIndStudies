var cleaningschedule = angular.module('cleaningschedule', [
							   'ngRoute', 'ngSanitize', 'ngResource', 'ui.bootstrap',
							   'ui.select', 'ui.keypress', 'nvd3', 'ngLodash', 'angularSpinner',
							   'selectize'
							   ]);

// calls the services to force pre-load of data:
cleaningschedule.run([
		      'homeService',
		      function(homeService) {
			  // intentionally left blank
		      }
		      ]);

cleaningschedule.run(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {
		    templateUrl: 'home.html',
			controller: 'HomeController'
		})// chain on others with .when(...)
		.otherwise({redirectTo: '/'});
	}]);

