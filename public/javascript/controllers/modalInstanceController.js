angular.module('meanstacktutorials').controller('ModalInstanceController', [
  '$scope',
  '$uibModal',
  'items',
  function ($scope, $uibModal, items) {

  $scope.items = items;
  // selected item from list
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModal.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModal.dismiss('cancel');
  };
}]);