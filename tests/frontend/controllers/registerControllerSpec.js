describe('Controller: public/RegisterController', function() {
  var controller;
  var $scope = {};
  
  beforeEach(angular.mock.module('meanstacktutorials'));
  
  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function($controller, $rootScope) {
    controller = $controller('RegisterController', {      
      '$scope': $scope
    });
  }));
  
  describe('Test login reset', function() {
    $scope.error = true;
    $scope.disabled = true;
    $scope.registerForm = {"foo" : "boo"};
    
    it('expect test to work', function() {
      
      expect($scope.name).toEqual('foo');
    });
    
    
    // $scope.login();
    // it('expect test to work', function() {
    //  expect($scope.name).toEqual('foo');
    //});
    /*
    it('expect members to be reset', function() {
      expect($scope.error).toBeFalsy();
      expect($scope.disabled).toBeFalsy();
      expect($scope.registerForm).toEqual(Object({}));
    });
    */
  });
});