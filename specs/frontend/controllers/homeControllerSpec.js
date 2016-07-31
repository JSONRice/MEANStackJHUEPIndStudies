describe('HomeControllerSpec', function () {
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
          _$location_, $rootScope, AuthenticationService, UserService) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    authenticationService = AuthenticationService;

    $location = _$location_;

    controller = $controller('HomeController', {
      '$scope': $scope,
      '$location': $location,
      'AuthenticationService': AuthenticationService,
      'UserService': UserService
    });    
    // mock username
    $scope.username = "foo";

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  }));

  describe("test logout", function () {
    it("after logout route to web root path", function () {
      $scope.loggedIn = true;
      $httpBackend.expectGET('/api/logout').respond(200);
      expect($scope.loggedIn).toBeTruthy();
      $scope.logout();
      $httpBackend.flush();
      expect($scope.loggedIn).toBeFalsy();      
    });
  });
});