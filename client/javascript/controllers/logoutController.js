angular.module('meanstacktutorials').controller('LogoutController', [
  '$scope',
  '$location',
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {
    $scope.logout = function () {
      AuthenticationService.logout().then(function () {
        $location.path('/');        
      });
      return true;
    };
  }
]);