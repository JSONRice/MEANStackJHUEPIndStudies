describe('UserServiceSpec', function () {

  var service;
  var $httpBackend;
  var $rootScope;
  var testUser = "ffstone";

  // Note: if you're having nested (double) $digest issues omit the following:
  // This should be resolved at this point but you might still have issues.
  // Documentation advises doing this but online critiques claim a double $digest
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(function () {
    angular.mock.module('meanstacktutorials');

    inject(function (UserService, $injector, _$httpBackend_, _$rootScope_) {
      service = UserService;
      $httpBackend = _$httpBackend_; // $injector.get('$httpBackend');
      $rootScope = _$rootScope_.$new();// $injector.get('$rootScope').$new();
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  });

  describe("Test getUsers", function () {
    it("Expect users after HTTP 200", function () {
      $httpBackend.expectGET('/api/users').respond(200, {status: 200});

      var dpromise = service.getUsers();

      expect(dpromise).toBeDefined();
      dpromise
              .then(function () {
              })
              .catch(function () {
              });
      $httpBackend.flush();
    });

    it("Expect error after HTTP 500", function () {
      $httpBackend.expectGET('/api/users').respond(500, {status: 500});

      var dpromise = service.getUsers();

      expect(dpromise).toBeDefined();
      dpromise.then(function () {
        // trip test
        expect("The promise should have failed yet succeeded. Please examine test.").toEqual("");

      }).catch(function () {
      });
      $httpBackend.flush();
    });
  });

  describe("Test getUser", function () {
    it("Expect null when parameter is undefined, null, or an empty string", function () {
      expect(service.getUser()).toBeNull();
      expect(service.getUser(null)).toBeNull();
      expect(service.getUser("")).toBeNull();
    });

    it("Expect user after HTTP 200", function () {
      $httpBackend.expectGET('/api/findUser/' + testUser).respond(200, {status: 200});

      var dpromise = service.getUser(testUser);

      expect(dpromise).toBeDefined();
      dpromise
              .then(function () {
              })
              .catch(function () {
              });
      $httpBackend.flush();
    });

    it("Expect error after HTTP 500", function () {
      $httpBackend.expectGET('/api/findUser/' + testUser).respond(500, {status: 500});

      var dpromise = service.getUser(testUser);

      expect(dpromise).toBeDefined();
      dpromise.then(function () {
        // trip test
        expect("The promise should have failed yet succeeded. Please examine test.").toEqual("");
      }).catch(function () {
      });
      $httpBackend.flush();
    });

  });

});