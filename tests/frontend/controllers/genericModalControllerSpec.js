describe('GenericModalControllerSpec', function () {
  var controller;
  var $scope;
  var uibModalInstance;
  var $httpBackend;

  beforeEach(angular.mock.module('meanstacktutorials'));

  /**
   * Note any alterations in the controller must be updated here:
   */
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    // The following can also be written out as:
    // uibModalInstance = jasmine.createSpyObj('uibModalInstance', ['close', 'dismiss', 'result.then']);
    uibModalInstance = {// Create a mock object using spies
      close: jasmine.createSpy('uibModalInstance.close'),
      dismiss: jasmine.createSpy('uibModalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('uibModalInstance.result.then')
      }
    };

    controller = $controller('GenericModalController', {
      '$scope': $scope,
      '$uibModalInstance': uibModalInstance
    });

    // See: client/javascript/app.js
    // Do not remove these two lines as all users are routed to the login.html page.
    // This needs to be in every spec. as long as the run() in app.js routes here.
    $httpBackend.expectGET('../templates/login.html').respond(200);
    $httpBackend.flush();
  }));

  describe("Modal ok", function () {
    it("Close after ok", function () {
      $scope.ok();
      expect(uibModalInstance.close).toHaveBeenCalledWith(true);
    });
  });

  describe("Modal cancel", function () {
    it("Dismiss after cancel", function () {
      $scope.cancel();
      expect(uibModalInstance.dismiss).toHaveBeenCalled();
    });
  });
});