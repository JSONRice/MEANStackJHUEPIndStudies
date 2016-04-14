describe('PageBannerControllerSpec', function () {
  var controller;
  var userService;
  var githubService;
  var authenticationService;
  var $scope;
  var $location;
  var $httpBackend;
  var uibModal;

  var masterJSON = {
    "name": "master",
    "commit": {
      "sha": "ed88730e44150c714cda63dde40f360273c232e0",
      "commit": {
        "author": {
          "name": "jsnrice",
          "email": "jsnrice@gmail.com",
          "date": "2016-04-13T01:38:55Z"
        },
        "committer": {
          "name": "jsnrice",
          "email": "jsnrice@gmail.com",
          "date": "2016-04-13T01:38:55Z"
        },
        "message": "Resolved deferred.reject AJAX calls. Added login spec.",
        "tree": {
          "sha": "8307cc8f9f0f188def910a19f263dff9593a5a75",
          "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/git/trees/8307cc8f9f0f188def910a19f263dff9593a5a75"
        },
        "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/git/commits/ed88730e44150c714cda63dde40f360273c232e0",
        "comment_count": 0
      },
      "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/ed88730e44150c714cda63dde40f360273c232e0",
      "html_url": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/commit/ed88730e44150c714cda63dde40f360273c232e0",
      "comments_url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/ed88730e44150c714cda63dde40f360273c232e0/comments",
      "author": {
        "login": "jasonwr",
        "id": 305999,
        "avatar_url": "https://avatars.githubusercontent.com/u/305999?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jasonwr",
        "html_url": "https://github.com/jasonwr",
        "followers_url": "https://api.github.com/users/jasonwr/followers",
        "following_url": "https://api.github.com/users/jasonwr/following{/other_user}",
        "gists_url": "https://api.github.com/users/jasonwr/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jasonwr/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jasonwr/subscriptions",
        "organizations_url": "https://api.github.com/users/jasonwr/orgs",
        "repos_url": "https://api.github.com/users/jasonwr/repos",
        "events_url": "https://api.github.com/users/jasonwr/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jasonwr/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "jasonwr",
        "id": 305999,
        "avatar_url": "https://avatars.githubusercontent.com/u/305999?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jasonwr",
        "html_url": "https://github.com/jasonwr",
        "followers_url": "https://api.github.com/users/jasonwr/followers",
        "following_url": "https://api.github.com/users/jasonwr/following{/other_user}",
        "gists_url": "https://api.github.com/users/jasonwr/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jasonwr/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jasonwr/subscriptions",
        "organizations_url": "https://api.github.com/users/jasonwr/orgs",
        "repos_url": "https://api.github.com/users/jasonwr/repos",
        "events_url": "https://api.github.com/users/jasonwr/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jasonwr/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
        {
          "sha": "5f434d2da251ed397bbb330a078fb2a7646bef70",
          "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/5f434d2da251ed397bbb330a078fb2a7646bef70",
          "html_url": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/commit/5f434d2da251ed397bbb330a078fb2a7646bef70"
        }
      ]
    },
    "_links": {
      "self": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/branches/master",
      "html": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/tree/master"
    }
  };

  var week2JSON = {
    "name": "week2",
    "commit": {
      "sha": "9fce679667acacc1be9ecaf1f2afcee589d94783",
      "commit": {
        "author": {
          "name": "Jason Rice",
          "email": "jsnrice@gmail.com",
          "date": "2016-02-08T04:44:29Z"
        },
        "committer": {
          "name": "Jason Rice",
          "email": "jsnrice@gmail.com",
          "date": "2016-02-08T04:44:29Z"
        },
        "message": "Checking in for the night.",
        "tree": {
          "sha": "ffc23bed21d5f4481df1deae91a16c53f780d728",
          "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/git/trees/ffc23bed21d5f4481df1deae91a16c53f780d728"
        },
        "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/git/commits/9fce679667acacc1be9ecaf1f2afcee589d94783",
        "comment_count": 0
      },
      "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/9fce679667acacc1be9ecaf1f2afcee589d94783",
      "html_url": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/commit/9fce679667acacc1be9ecaf1f2afcee589d94783",
      "comments_url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/9fce679667acacc1be9ecaf1f2afcee589d94783/comments",
      "author": {
        "login": "jasonwr",
        "id": 305999,
        "avatar_url": "https://avatars.githubusercontent.com/u/305999?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jasonwr",
        "html_url": "https://github.com/jasonwr",
        "followers_url": "https://api.github.com/users/jasonwr/followers",
        "following_url": "https://api.github.com/users/jasonwr/following{/other_user}",
        "gists_url": "https://api.github.com/users/jasonwr/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jasonwr/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jasonwr/subscriptions",
        "organizations_url": "https://api.github.com/users/jasonwr/orgs",
        "repos_url": "https://api.github.com/users/jasonwr/repos",
        "events_url": "https://api.github.com/users/jasonwr/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jasonwr/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "jasonwr",
        "id": 305999,
        "avatar_url": "https://avatars.githubusercontent.com/u/305999?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/jasonwr",
        "html_url": "https://github.com/jasonwr",
        "followers_url": "https://api.github.com/users/jasonwr/followers",
        "following_url": "https://api.github.com/users/jasonwr/following{/other_user}",
        "gists_url": "https://api.github.com/users/jasonwr/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/jasonwr/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/jasonwr/subscriptions",
        "organizations_url": "https://api.github.com/users/jasonwr/orgs",
        "repos_url": "https://api.github.com/users/jasonwr/repos",
        "events_url": "https://api.github.com/users/jasonwr/events{/privacy}",
        "received_events_url": "https://api.github.com/users/jasonwr/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
        {
          "sha": "fe7374d8064e886a8356cfec53861692a5e86336",
          "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/fe7374d8064e886a8356cfec53861692a5e86336",
          "html_url": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/commit/fe7374d8064e886a8356cfec53861692a5e86336"
        }
      ]
    },
    "_links": {
      "self": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/branches/week2",
      "html": "https://github.com/jasonwr/MEANStackJHUEPIndStudies/tree/week2"
    }
  };

  // Note: if you're having nested (double) $digest issues omit the following:
  // This should be resolved at this point but you might still have issues.
  // Documentation advises doing this but online critiques claim a double $digest
//  afterEach(function () {
//    $httpBackend.verifyNoOutstandingExpectation();
//    $httpBackend.verifyNoOutstandingRequest();
//  });  

  beforeEach(angular.mock.module('meanstacktutorials'));

  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function (_$httpBackend_, $controller,
          $rootScope, _$location_, _$log_, UserService,
          GithubService, AuthenticationService, $uibModal) {
    $httpBackend = _$httpBackend_;

    $location = _$location_;

    userService = UserService;
    githubService = GithubService;
    authenticationService = AuthenticationService;

    $scope = $rootScope.$new();

    uibModal = $uibModal;
    uibModalSpy = jasmine.createSpyObj('uibModal', ['open']);
    $scope.username = "ffstone";

    controller = $controller('PageBannerController', {
      '$scope': $scope,
      '$location': $location,
      '$uibModal': uibModal,
      '$log': _$log_,
      'UserService': userService,
      'GithubService': githubService,
      'AuthenticationService': authenticationService
    });
  }));

  describe("Access modal templates", function () {
    it("Cycle through and open all modals. Then logout.", function () {
      // Spy on the existing modalInstance function
      spyOn($scope, 'modalInstance');

      $httpBackend.expectGET("https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/branches").respond(200,
              [
                {
                  "name": "master",
                  "commit": {
                    "sha": "ed88730e44150c714cda63dde40f360273c232e0",
                    "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/ed88730e44150c714cda63dde40f360273c232e0"
                  }
                },
                {
                  "name": "week2",
                  "commit": {
                    "sha": "9fce679667acacc1be9ecaf1f2afcee589d94783",
                    "url": "https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/commits/9fce679667acacc1be9ecaf1f2afcee589d94783"
                  }
                }
              ]);
      // Simulate a legitimate user who has just logged in      
      expect($scope.username).toEqual("ffstone");
      $httpBackend.expectGET("/api/findUser/" + $scope.username).respond(200, {firstname: "Fred", lastname: "Flintstone"});
      $httpBackend.expectGET('../templates/login.html').respond(200);
      $httpBackend.expectGET("https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/branches/master").respond(200, masterJSON);
      $httpBackend.expectGET("https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies/branches/week2").respond(200, week2JSON);

      // Test out all the modal templates here. They should all exist.
      $scope.openFAQ('md');
      $scope.openHistory('lg');

      // must flush prior to expect so AJAX finishes. flush waits for AJAX to finish and is a wrapper around $digest (think $apply)
      $httpBackend.flush();

      expect($scope.modalInstance).toHaveBeenCalledWith('../../templates/modals/faq.html',
              'GenericModalController', 'md');
      expect($scope.modalInstance).toHaveBeenCalledWith('../../templates/modals/history.html',
              'GenericModalController', 'lg');

      // Because the Github branches are queried through AJAX every time an instance of PageBannerController is allocated
      // it's much easier to just call logout below so we don't have to mock up all our tests again. Note that the
      // PageBannerController is called once and that is to be associated with the pageBanner.html template so this is alright
      // Optional: place the AJAX call within the preload in the client app.js to possibly prevent this testing madness.

      $httpBackend.expectGET('/api/logout').respond(200, {status: 200});
      var status = $scope.logout();
      $httpBackend.flush();
      expect(status).toEqual(true);      
    });
  });
});