angular.module('meanstacktutorials').controller('RegisterController', [
  '$scope',
  '$location',
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {

    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthenticationService.register(
              $scope.registerForm.username,
              $scope.registerForm.firstname,
              $scope.registerForm.lastname,
              $scope.registerForm.password)
              // handle success
              .then(function () {
                $location.path('login');
                $scope.disabled = false;
                $scope.registerForm = {};
              })
              // handle error
              .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "A user with the given username is already registered.";
                $scope.disabled = false;
                $scope.registerForm = {};
              });

    };

    // login (back) button
    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = false;
      $location.path('/login');
      $scope.registerForm = {};
    };
  }]);