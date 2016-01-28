angular.module('meanstacktutorials').controller('HomeController', [
  '$scope',
  '$modal',
  'homeService',
  'lodash',
  function($scope, $modal, homeService, _) {
    $scope.status = {};
    $scope.status.isOpen = false;
    $scope.input = {};
    $scope.input.search = "";
    $scope.input.owner = "";
    $scope.input.entry = -1;
    $scope.input.states = [];
    $scope.input.disciplineStates = [];
    $scope.homeSort = {};
    console.log('loaded meanstacktutorials.HomeController');    
    // TODO: add more functionality
  }
]);