describe('LoginControllerSpec', function () {
  var controller;
  var authenticationService;
  var $scope;
  var $location;
  var $httpBackend;

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
    authenticationService = AuthenticationService;

    $location = _$location_;

    controller = $controller('LoginController', {
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
  
  describe("Test login HTTP 403", function() {
    it("Login with response of HTTp 403", function() {
      $scope.loginForm = {
        username : "foo",
        password : "foobar"
      };
      $httpBackend.expectPOST('/api/login', $scope.loginForm).respond(403, {status: 403});
      $scope.login();
      $httpBackend.flush();
      expect($scope.errorMessage).toBeDefined();
    });
  });
  
  describe("Test login HTTP 200", function() {
    it("Login with response of HTTP 200", function() {
      $scope.loginForm = {
        username : "foo",
        password : "foobar"
      };
      // mock up some values
      $scope.error = true;
      $scope.disabled = true;
      
      $httpBackend.expectPOST('/api/login', $scope.loginForm).respond(200);
      $httpBackend.expectGET('../templates/home.html').respond(200);
      $scope.login();
      $httpBackend.flush();      
      expect($scope.error).toBeFalsy();
      expect($scope.disabled).toBeFalsy();
    });
  });  
  
  describe("Test registration", function() {
    it("Test registration routing", function() {
      $scope.error = false;
      $scope.disabled = true;   
      expect($scope.error).toBeFalsy();
      expect($scope.disabled).toBeTruthy();
      $httpBackend.expectGET('../templates/register.html').respond({"Accept":"application/json, text/plain, */*"});
      $scope.register();
      $httpBackend.flush();
      expect($scope.error).toBeFalsy();
      expect($scope.disabled).toBeFalsy();
    });
  });
});