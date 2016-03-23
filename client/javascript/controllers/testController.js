meanstacktutorials.controller("TestController", function ($scope, $sce) {
  $scope.text = $sce.trustAsHtml('<div>Some default text</div>');
  console.log('testController text: ' + $scope.text);
});