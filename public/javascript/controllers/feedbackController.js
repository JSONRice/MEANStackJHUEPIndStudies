angular.module('meanstacktutorials').controller('FeedbackController', [
  '$scope',
  '$modalInstance',
  function ($scope, $modalInstance) {
    /***
     * DIALOG FUNCTIONS:
     */
    $scope.ok = function() {
      $modalInstance.close();
    };
    
    /***
     * HELPERS:
     */
    
    /**
     * MUTATORS: 
     */
  }
]);
