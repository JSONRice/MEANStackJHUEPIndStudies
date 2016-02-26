angular.module('meanstacktutorials').controller('PageBannerController', [
  '$scope',
  '$location',
  '$uibModal',
  '$log',
  'DatabaseService',
  'AuthenticationService',
  function ($scope, $location, $uibModal, $log, DatabaseService, AuthenticationService) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();

    $scope.open = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: '../../templates/faqModal.html',
        controller: 'ModalInstanceController',
        size: size,
        // pass any data to modal controller here:
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.userdata = {};
    DatabaseService.getUser($scope.username)
            .then(function (userdata) {
              // now that we have the JSON of users go ahead and grab just the user we want
              $scope.userdata = userdata;
            }, function (error) {
              console.error(error);
            });

    $scope.logout = function () {
      console.log(AuthenticationService.getUserStatus());

      AuthenticationService.logout()
              .then(function () {
                console.log('Logging out...');
                $location.path('/');
              });
    };
  }]);


