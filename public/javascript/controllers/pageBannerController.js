angular.module('meanstacktutorials').controller('PageBannerController', [
  '$scope',
  '$location',
  '$uibModal',
  '$log',
  'UserService',
  'VersionService',
  'AuthenticationService',
  function ($scope, $location, $uibModal, $log,
          UserService, VersionService, AuthenticationService) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();

    // common variables for use throughout the banner pages:
    $scope.mostRecentVersion = "";
    $scope.githubUrl = "foo";
    $scope.githubAuthor = "foo";
    $scope.githubTitle = "foo";

    $scope.versiondata = {};
    VersionService.getVersionData()
            .then(function (versiondata) {
              $scope.versiondata = versiondata;
            }, function (error) {
              console.error(error);
            });


    $scope.openFeedback = function (size) {
      modalInstance('../../templates/modals/feedback.html',
              'FeedbackController', size);
    };

    $scope.openFAQ = function (size) {
      modalInstance('../../templates/modals/faq.html',
              'GenericModalController', size);
    };

    $scope.openHistory = function (size) {
      modalInstance('../../templates/modals/history.html',
              'GenericModalController', size);
    };


    function modalInstance(templateUrl, controller, size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: controller,
        size: size,
        // Don't use 'this' here unless you want to use the controller $scope
        // passed into the 'controller' field. Just '$scope' will use the $scope
        // of this controller (JS file):
        scope: $scope,
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
    }

    $scope.userdata = {};
    UserService.getUser($scope.username)
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


