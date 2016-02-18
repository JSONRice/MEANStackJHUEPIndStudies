angular.module('meanstacktutorials').controller('RegisterController', [
  '$scope', 
  '$location', 
  'AuthenticationService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function(){

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
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
    
    // This is for the "Login" button on the register page which is really just a back button.
    $scope.login = function(){
      // initial values
      $scope.error = false;
      $scope.disabled = true;
      
      $scope.disabled = false;      
      $location.path('login');
      $scope.registerForm = {};
    };
  }]);