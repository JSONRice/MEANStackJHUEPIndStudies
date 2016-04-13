describe('AjaxServiceSpec', function () {

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

    inject(function (AjaxService, $injector, _$httpBackend_, _$rootScope_) {
      service = AjaxService;
      $httpBackend = _$httpBackend_; // $injector.get('$httpBackend');
      $rootScope = _$rootScope_.$new();// $injector.get('$rootScope').$new();
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  });

  describe("Test templateToString", function () {
    it("expect string from valid template url HTTP 200", function () {
      var templateURL = "../../templates/home.html";
      var response = "<div>" +
              "<page-banner></page-banner>" +
              "<div ng-controller=\"TreeController\" id=\"treeView\">" +
              "<table>" +
              "<tr>" +
              "<td style=\"vertical-align:top;\">" +
              "<div class=\"home-tree\">" +
              "<tree tree-data=\"my_data\"" +
              "tree-control=\"my_tree\"" +
              "on-select=\"my_tree_handler(branch)\"" +
              "initial-selection=\"MEAN Stack Introduction\"></tree>" +
              "</div>" +
              "</td>" +
              "<td style=\"padding:20px;vertical-align:top;\">" +
              "<div class=\"row\">" +
              "<div class=\"col-lg-11 col-md-11 col-s-11 col-xs-11\">" +
              "<div class=\"alert alert-info\" bind-html-compile=\"output\"></div>" +
              "</div>" +
              "</div>" +
              "</td>" +
              "</tr>" +
              "</table>" +
              "</div>" +
              "</div>";
      $httpBackend.expectGET(templateURL).respond(200, response);
      var dpromise = service.templateToString(templateURL);
      dpromise.then(function (templateStr) {
        expect(templateStr).toEqual(response);
      }, function () {
      });
      $httpBackend.flush();
    });

    it("try passing in an invalid template url HTTP 200", function () {
      var templateURL = "../../templates/foobar.html";
      $httpBackend.expectGET(templateURL).respond(200, { });

      var dpromise = service.templateToString(templateURL);
      dpromise.then(function (templateStr) {
        expect(templateStr).toEqual({ });
      }, function () {
      });
      $httpBackend.flush();
    });    
  });
});