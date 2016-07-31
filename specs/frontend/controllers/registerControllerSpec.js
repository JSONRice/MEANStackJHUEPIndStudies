describe('RegisterControllerSpec', function () {
  var controller;
  var $scope;
  var $location;
  var $httpBackend;

  var registerForm = {
    username: 'mpython',
    firstname: 'Monty',
    lastname: 'Python',
    password: 'pythonsR@wesome'
  };

  // Note: if you're having nested (double) $digest issues omit the following:
  // This should be resolved at this point but you might still have issues.
  // Documentation advises doing this but online critiques claim a double $digest
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(angular.mock.module('meanstacktutorials'));

  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function (_$httpBackend_, $controller,
          _$location_, $rootScope, AuthenticationService) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    // initial values
    $scope.error = false;
    $scope.disabled = true;    
    $scope.registerForm = angular.copy(registerForm);
    
    $location = _$location_;
    controller = $controller('RegisterController', {
      '$scope': $scope,
      '$location': $location,
      'AuthenticationService': AuthenticationService
    });
    
    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();    
  }));

  describe('Test first time registration', function () {
    it('expect disabled to be false after register', function () {
      // mock a disabled account:
      $scope.disabled = true;
      // Bind form to scope as the register will be expecting this:

      $scope.registerForm = angular.copy(registerForm);
      $httpBackend.expectPOST('/api/register', $scope.registerForm).respond(200, {status: 200});
      $scope.register(angular.copy(registerForm));
      // force synchronous transaction so the $scope.disabled gets set to false in $scope.register(...)
      $httpBackend.flush();
      // should now be undisabled:
      expect($scope.disabled).toBeFalsy();
    });
    it('expect error to be false', function () {
      expect($scope.error).toBeFalsy();
    });
  });

  describe('Test login', function () {
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