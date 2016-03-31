describe('RegisterControllerSpec', function () {
  var controller;
  var $scope = {};

  beforeEach(angular.mock.module('meanstacktutorials'));

  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function ($controller, $rootScope) {
    controller = $controller('RegisterController', {
      '$scope': $scope
    });
  }));

  describe('Test foo', function () {
    it('expect name to be foo', function () {
      expect($scope.name).toEqual('foo');
    });
  });

  describe('Test login', function () {

    it("test foo", function () {
      expect($scope.name).toEqual("foo");
    })

    it("expect error to be false after login", function () {
      $scope.error = true;
      $scope.login();
      expect($scope.error).toBeFalsy();
    });

    it("expect disabled to be false after login", function () {
      $scope.disabled = true;
      $scope.login();
      expect($scope.disabled).toBeFalsy();
    });

    it("expect registerForm to be empty after login", function () {
      $scope.registerForm = {"foo": "boo"};
      $scope.login();
      expect($scope.registerForm).toEqual(Object({}));
    });
  });
});