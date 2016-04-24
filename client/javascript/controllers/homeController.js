angular.module('meanstacktutorials').controller('HomeController', [
  '$scope',
  '$location',
  'AuthenticationService',
  'UserService',
  function ($scope, $location, AuthenticationService, UserService) {
    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();

    function getCurrentlyLoggedInUsername() {
      return $scope.username;
    };

    $scope.logout = function () {
      AuthenticationService.logout()
              .then(function () {
                $location.path('/');
                $scope.loggedIn = false;
              });
    };

    return ({
      getCurrentlyLoggedInUsername: function () {
        return getCurrentlyLoggedInUsername();
      }
    });
  }
]);