describe('AuthenticationServiceSpec', function () {

  var service;
  var $httpBackend;
  var $rootScope;

  var username = "jsnrice";
  var firstname = "Jason";
  var lastname = "Rice";
  var password = "Joan0f@Rc.Fire";


  // Note: if you're having nested (double) $digest issues omit the following:
  // This should be resolved at this point but you might still have issues.
  // Documentation advises doing this but online critiques claim a double $digest
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(function () {
    angular.mock.module('meanstacktutorials');

    inject(function (AuthenticationService, $injector) {
      service = AuthenticationService;
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope').$new();
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  });

  describe("Test name setters/getters", function () {
    it("name setters/getters", function () {
      service.setUsername("kingrufus");
      expect(service.getUsername()).toEqual("kingrufus");
    });
  });

  describe("Test user status getter", function () {
    it("user status getter", function () {
      expect(service.getUserStatus()).toBeNull();
    });
  });

  describe("Test default login status of a user (getter)", function () {
    it("isLoggedIn should return false", function () {
      expect(service.isLoggedIn()).toBeFalsy();
    });
  });

  describe("Test registration and login HTTP 503", function () {
    it("test registration when HTTP 503", function () {
      // Prior to registration we shouldn't be logged in:
      expect(service.isLoggedIn()).toBeFalsy();


      var numCallsToMake = 2;
      for (var i = 0; i < numCallsToMake; i++) {
        var data = {status: 503};
        $httpBackend.expectPOST('/api/register', {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password
        }).respond(503, data);

        var dpromise = service.register(username, firstname, lastname, password);

        expect(dpromise).toBeDefined();
        // Now that we have a promise use it:
        dpromise.then(function () {
          // trip test
          expect("exception! registration succeeded under HTTP 503!").toEqual("");
        })
                // Already registered:
                .catch(function () {
                  expect(service.isLoggedIn()).toBeFalsy();
                });
        $httpBackend.flush();


        $httpBackend.expectPOST('/api/login', {
          username: username,
          password: password
        }).respond(503);

        // Now log in:
        var dpromise = service.login(username, password);
        expect(dpromise).toBeDefined();

        dpromise.then(function () {
          // trip test
          expect("exception! logging in succeeded under HTTP 503!").toEqual("");
        }).catch(function (err) {
          expect(service.isLoggedIn()).toBeFalsy();
        });
        $httpBackend.flush();
      }
    });
  });

  describe("Test registration and login HTTP 200", function () {
    it("Test registration when HTTP 200", function () {
      // Prior to registration we shouldn't be logged in:
      expect(service.isLoggedIn()).toBeFalsy();

      var numCallsToMake = 2;
      for (var i = 0; i < numCallsToMake; i++) {
        var data = {status: 200};
        $httpBackend.expectPOST('/api/register', {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password
        }).respond(200, data);

        var dpromise = service.register(username, firstname, lastname, password);

        expect(dpromise).toBeDefined();
        // Now that we have a promise use it:
        dpromise
                // First call registers the user
                .then(function () {
                  // The user should now be registered the response
                  // data was already mocked (status 200)
                })
                // Already registered:
                .catch(function () {
                  // trip test
                  expect("exception! registration failed!").toEqual("");
                });
        $httpBackend.flush();


        $httpBackend.expectPOST('/api/login', {
          username: username,
          password: password
        }).respond(200);

        // Now log in:
        var dpromise = service.login(username, password);
        expect(dpromise).toBeDefined();

        dpromise.then(function () {
          expect(service.isLoggedIn()).toBeTruthy();
        }).catch(function (err) {
          expect(service.isLoggedIn()).toBeFalsy();
          // trip test
          expect("exception! logging failed!").toEqual("");
        });
        $httpBackend.flush();
      }
    });

    describe("Test logging out HTTP 200", function () {
      it("Test logging out HTTP 200", function () {
        expect(service.getUserStatus()).toBeFalsy();
        service.setUserStatus(true);
        expect(service.getUserStatus()).toBeTruthy();
        $httpBackend.expectGET('/api/logout').respond(200);
        
        var dpromise = service.logout();

        expect(dpromise).toBeDefined();
        // Now that we have a promise use it:
        dpromise
                // First call should log out the user
                .then(function () {
                  expect(service.getUserStatus()).toBeFalsy();
                })
                // Something went wrong:
                .catch(function () {
                  // trip test
                  expect("exception! logging out failed!").toEqual("");
                });
        $httpBackend.flush();
      });
    });

    describe("Test logging out HTTP 500", function () {
      it("Test logging out HTTP 500", function () {
        expect(service.getUserStatus()).toBeFalsy();
        service.setUserStatus(true);
        expect(service.getUserStatus()).toBeTruthy();
        $httpBackend.expectGET('/api/logout').respond(500);
        
        var dpromise = service.logout();

        expect(dpromise).toBeDefined();
        // Now that we have a promise use it:
        dpromise
                // First call should log out the user
                .then(function () {
                  // trip test
                  expect("exception! logging out survived HTTP 500!").toEqual("");
                })
                .catch(function () {
                  // user is still logged in after a bad logout request. this is OK
                  expect(service.getUserStatus).toBeTruthy();
                });
        $httpBackend.flush();
      });
    });
  });
});