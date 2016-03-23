angular.module('meanstacktutorials').controller('HomeController', [
  '$scope',
  '$location',
  'AuthenticationService',
  'UserService',
  '$timeout',
  function ($scope, $location, AuthenticationService, UserService, timeout) {
    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();

    $scope.userdata = {};
    UserService.getUser($scope.username)
            .then(function (userdata) {
              // now that we have the JSON of users go ahead and grab just the user we want
              $scope.userdata = userdata;
            }, function (error) {
              console.error(error);
            });

    $scope.logout = function () {
      console.log(AuthenticationService.getUserStatus());

      AuthenticationService.logout()
              .then(function () {
                console.log('Logging out...');
                $location.path('/');
              });
    };
  }
]);