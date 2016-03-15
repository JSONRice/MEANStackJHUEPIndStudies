angular.module('meanstacktutorials').controller('LogoutController', [
  '$scope', 
  '$location', 
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {
    $scope.logout = function() {
      console.log(AuthenticationService.getUserStatus());
      
      AuthenticationService.logout()
              .then(function() {
         console.log('Logging out...');
         $location.path('/');       
      });
    };
  }
]);