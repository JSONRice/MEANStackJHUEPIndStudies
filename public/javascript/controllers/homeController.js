angular.module('cleaningschedule').controller('HomeController', [
  '$scope',
  '$state',
  '$modal',
  'homeService',
  'lodash',
  function($scope, $state, $modal, homeService, _) {
    $scope.status = {};
    $scope.status.isOpen = false;
    $scope.input = {};
    $scope.input.search = "";
    $scope.input.owner = "";
    $scope.input.entry = -1;
    $scope.input.states = [];
    $scope.input.disciplineStates = [];
    $scope.homeSort = {};
    console.log('loaded cleaningschedule.HomeController');    
    // TODO: add more functionality
  }
]);