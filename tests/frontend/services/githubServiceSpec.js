describe('GithubServiceSpec', function () {

  var service;
  var $httpBackend;
  var $scope;
  var url = 'https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies';

  // Note: if you're having nested (double) $digest issues omit the following:
  // This should be resolved at this point but you might still have issues.
  // Documentation advises doing this but online critiques claim a double $digest
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(function () {
    angular.mock.module('meanstacktutorials');

    inject(function (GithubService, $injector, _$httpBackend_, _$rootScope_) {
      service = GithubService;
      $httpBackend = _$httpBackend_; // $injector.get('$httpBackend');
      $scope = _$rootScope_.$new();// $injector.get('$rootScope').$new();
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  });

  describe("Test Github URL", function () {
    it("Github URL defined", function () {
      expect(service.getGithubUrl()).toEqual(url);
    });
  });

  describe("Test getGitBranchData", function () {
    it("Expect promise from getGitBranchData", function () {      
      var data = {status: 200};      
      $httpBackend.expectGET(url + '/branches').respond(200, data);
      var dpromise = service.getGitBranchData();
      expect(dpromise).toBeDefined();
      // Now that we have a promise use it:
      dpromise
              .then(function () {
              })
              .catch(function () {
                // trip test
                expect("exception! something bad happened!").toEqual("");
              });
      $httpBackend.flush();
    });
  });
  
  describe("Test httpGitGET HTTP 200", function() {
    it("Expect promise from httpGitGET", function() {
      var data = {status: 200};      
      $httpBackend.expectGET(url).respond(200, data);
      var dpromise = service.httpGitGET(url);
      expect(dpromise).toBeDefined();
      dpromise
              .then(function () {
                // success
              })
              .catch(function () {
                // trip test
                expect("exception! something bad happened!").toEqual("");
              });
      $httpBackend.flush();      
    });
  });
  
  describe("Test httpGitGET HTTP 500", function() {
    it("Expect promise from httpGitGET", function() {
      var data = {status: 500};      
      $httpBackend.expectGET(url).respond(500, data);
      var dpromise = service.httpGitGET(url);
      expect(dpromise).toBeDefined();
      dpromise
              .then(function () {
                // success
              })
              .catch(function () {
                // trip test
                expect("exception! something bad happened!").toEqual("");
              });
      $httpBackend.flush();      
    });
  });
  
});