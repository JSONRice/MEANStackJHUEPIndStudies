angular.module('meanstacktutorials').controller('LoginController', [
  '$scope',
  '$location',
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {
   
    $scope.login = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AuthenticationService.login(
              $scope.loginForm.username,
              $scope.loginForm.password)
              // handle success
              .then(function () {                
                $scope.disabled = false;
                AuthenticationService.setUsername($scope.loginForm.username);
                $location.path('/home');
                $scope.loginForm = {};
              })
              // handle error
              .catch(function () {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.loginForm = {};
              });

    };

    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      console.log('Routing to registration');
      $location.path('/register');
      $scope.disabled = false;
      $scope.loginForm = {};
    };
  }]);
