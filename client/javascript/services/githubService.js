angular.module('meanstacktutorials').service('GithubService', [
  '$q',
  '$http',
  function ($q, $http) {

    var url = 'https://api.github.com/repos/jasonwr/MEANStackJHUEPIndStudies';
    var gitBranchData;
    // JSON request from the html_url in the gitBranchData request
    var gitBranchSpecificData;
    var gitData;
    var self = this;
    
    function getGithubUrl() {
      console.log('getGithubUrl: ' + url);
      return url;
    }

    function httpGitGET(url) {
      var deferred = $q.defer();
      $http.get(url).success(function (response) {
        self.gitData = angular.copy(response);
        deferred.resolve(self.gitData);
      }).error(function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function httpGitBranchGET(url) {
      var deferred = $q.defer();
      $http.get(url).success(function (response) {
        // GET the html_url from each branch url:

        for (var i = 0; i < response.length; i++) {
          if (!self.gitBranchData) {
            self.gitBranchData = [];
          }

          self.gitBranchData.push(response[i]);

          var branchUrl = self.gitBranchData[self.gitBranchData.length - 1].commit.url;
        }
        deferred.resolve(self.gitBranchData);
      }).error(function (response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    };

    return({
      getGitData: function () {
        var data = httpGitGET(url);
        return data;
      },
      getGitBranchData: function () {
        // Return just the deferred promise so the calling module can use .then
        return httpGitBranchGET(url + '/branches');
      },
      httpGitGET: function (url) {
        var deferred = $q.defer();
        $http.get(url).success(function (response) {
          self.gitData = angular.copy(response);
          deferred.resolve(self.gitData);
        }).error(function (response) {
          deferred.resolve(response);
        });
        return deferred.promise;
      },
      getGithubUrl: getGithubUrl
    });
  }
]);