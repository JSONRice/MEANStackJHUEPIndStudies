angular.module('meanstacktutorials').controller('FeedbackController', [
  '$scope',
  '$uibModalInstance',
  'GenericModalController',
  function ($scope, $uibModalInstance, GenericModalController) {

    /***
     * DIALOG FUNCTIONS:
     */
    $scope.ok = GenericModalController.$scope.ok();

    $scope.cancel = GenericModalController.$scope.cancel();

    /***
     * HELPERS:
     */

    /**
     * MUTATORS: 
     */

  }
]);
