/**
 * General purpose modal controller that just provides a simple Ok Cancel button and is meant
 * for just displaying informative text. If you need something beyond this then create a modal
 * specific controller and pass it this controller to access common functionality.
 */
angular.module('meanstacktutorials').controller('GenericModalController', function ($scope, $uibModalInstance) {
  /***
   * DIALOG FUNCTIONS:
   */
  $scope.ok = function () {
    // Note pass any data you wish to close here.
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});