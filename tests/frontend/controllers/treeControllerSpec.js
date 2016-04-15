describe('TreeControllerSpec', function () {
  var controller;
  var $scope;
  var $timeout;
  var $httpBackend;
  var ajaxService;

  var branch = {label: "test", data: {
      url: 'templates/tutorials/toc/toc.html'
    }
  };

  beforeEach(angular.mock.module('meanstacktutorials'));

  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function (_$httpBackend_, $controller,
          $rootScope, _$timeout_, AjaxService) {
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    ajaxService = AjaxService;
    controller = $controller('TreeController', {
      '$scope': $scope,
      '$timeout': _$timeout_,
      'AjaxService': ajaxService
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  }));

  describe("Test tree handler HTTP 200", function () {
    it("Populate tree handler output HTTP 200", function () {
      $httpBackend.expectGET('templates/tutorials/toc/toc.html').respond(200);
      $scope.output = null;
      expect($scope.output).toBeNull();
      $scope.my_tree_handler(branch);      
      expect($scope.output).toEqual('<h1>' + branch.label + '</h1>');
      $httpBackend.flush();
    });
  });
  
  // TODO
  xdescribe("Test tree handler HTTP 500", function () {
    it("Populate tree handler output HTTP 500", function () {
      $httpBackend.expectGET('templates/tutorials/toc/toc.html').respond(500);
      $scope.output = null;
      expect($scope.output).toBeNull();
      $scope.my_tree_handler(branch);     
      $httpBackend.flush();
    });
  });  
});
