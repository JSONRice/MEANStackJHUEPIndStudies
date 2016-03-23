angular.module('meanstacktutorials').controller('IndexController', [
  '$scope',
  '$modal',
  'indexService',
  'lodash',
  function ($scope, $modal, indexService, _) {
    $scope.status = {};
    $scope.status.isOpen = false;
    $scope.input = {};
    $scope.input.search = "";
    $scope.input.owner = "";
    $scope.input.entry = -1;
    $scope.input.states = [];
    $scope.input.disciplineStates = [];
    $scope.homeSort = {};
    // TODO: add more functionality
  }
]);