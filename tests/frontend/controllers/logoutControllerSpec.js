describe('LogoutControllerSpec', function () {
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
    //authenticationService = AuthenticationService;

    $location = _$location_;
    
    authenticationService = AuthenticationService;
    
    $scope = $rootScope.$new();

    controller = $controller('LogoutController', {
      '$scope': $scope,
      '$location': $location,
      'AuthenticationService': authenticationService
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  }));

  describe("Test logout HTTP 200", function () {
    it("Logout with response of HTTP 200", function () {
      $httpBackend.expectGET('/api/logout').respond(200, {status: 200});
      var status = $scope.logout();
      $httpBackend.flush();
      expect(status).toEqual(true);
    });
  });
});