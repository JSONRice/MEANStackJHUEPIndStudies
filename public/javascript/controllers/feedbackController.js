angular.module('meanstacktutorials').controller('FeedbackController', [
  '$scope',
  '$uibModalInstance',
  function ($scope, $uibModalInstance) {
    console.log('feedback controller loaded');
    /***
     * DIALOG FUNCTIONS:
     */
    $scope.ok = function() {
      // Note pass any data you wish to close here.
      $uibModalInstance.close();
    };
    
    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
    
    /***
     * HELPERS:
     */
    
    /**
     * MUTATORS: 
     */
    
  }
]);
