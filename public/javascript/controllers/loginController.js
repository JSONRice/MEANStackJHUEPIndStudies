angular.module('meanstacktutorials').controller('LoginController', [
  '$scope', 
  '$location', 
  'AuthenticationService',
  function ($scope, $location, AuthenticationService) {

    console.log(AuthenticationService.getUserStatus());

    // This function is called via ng-submit or any other ng in the html
    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // invoke the login function from service
      AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
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

}]);
