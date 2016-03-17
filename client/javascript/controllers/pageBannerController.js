angular.module('meanstacktutorials').controller('PageBannerController', [
  '$scope',
  '$location',
  '$uibModal',
  '$log',
  'UserService',
  'GithubService',
  'AuthenticationService',
  function ($scope, $location, $uibModal, $log,
          UserService, GithubService, AuthenticationService) {
    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();
    
    /**
     * Fetch the branch url labeled as commit.url then use this to request another
     * HTTP GET to fecth specific branch info. Then push the result onto the branch data.
     * @data {Object}
     */
    GithubService.getGitBranchData().then(function (data) {
      // Preserve scope for additional AJAX calls further down:
      var _this = this;

      // Preserve the generic branch data for next AJAX request.
      _this.branches = angular.copy(data);
      _this.branchData = [];
      _this.offset = 0;
      _this.url = GithubService.getGithubUrl();
      
      for (var i = 0; i < _this.branches.length; i++) {
        _this.branchurl = _this.url + '/branches/' + _this.branches[i].name;

        GithubService.httpGitGET(_this.branchurl).then(function (specificBranchData) {
          _this.branchData.push(specificBranchData);
        });
      }
      $scope.gitspecificbranchdata = _this.branchData || {};
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
              $scope.userdata = userdata;
            }, function (error) {
              console.error(error);
            });

    $scope.logout = function () {
      console.log(AuthenticationService.getUserStatus());
      AuthenticationService.logout()
              .then(function () {
                $location.path('/');
              });
    };
  }]);


