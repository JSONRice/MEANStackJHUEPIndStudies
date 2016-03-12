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
    // $scope is global to all modals and elements associated with the page banner view:

    $scope.username = AuthenticationService.getUsername() || "";
    $scope.loggedIn = AuthenticationService.isLoggedIn();

    GithubService.getGitData().then(function (data) {
      $scope.gitdata = data || {};
    });

    /**
     * Fetch the branch url labeled as commit.url then use this to request another
     * HTTP GET to fecth specific branch info. Then push the result onto the branch data.
     * @data {Object}
     */
    GithubService.getGitBranchData().then(function (data) {
      // Preserve scope for later usage
      var _this = this;

      // Preserve the generic branch data in scope for next AJAX request.
      // This tactic gets around some inner scoping issues with new object instances of 'this'
      _this.branches = angular.copy(data);
      _this.branchData = [];
      _this.offset = 0;
      // var url;
      _this.url = GithubService.getGithubUrl();
      for (var i = 0; i < _this.branches.length; i++) {
        console.log('Preparing to call: ' + _this.url + '/branches/' + _this.branches[i].name);
        _this.branchurl = _this.url + '/branches/' + _this.branches[i].name;

        GithubService.httpGitGET(_this.branchurl)
                .then(function (specificBranchData) {
                  _this.branchData.push(specificBranchData);
                });

        /*
         GithubService.httpGitGET(_this.copy[i].commit.url)
         .then(function (specificBranchData) {
         _this.branchData.push(specificBranchData);
         // console.log('_this.offset = ' + _this.offset);
         _this.offset = _this.branchData.length - 1;
         _this.branchData[_this.offset].name = _this.copy[_this.offset].name;
         // console.log('['+_this.offset+'] =>' + branchData[_this.offset].name); 
         console.log('['+_this.offset+']'+'sha: ' + _this.branchData[_this.offset].sha);
         });
         */
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


