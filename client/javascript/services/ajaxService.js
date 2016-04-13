angular.module('meanstacktutorials').service('AjaxService', [
  '$templateRequest',
  '$sce',
  '$q',
  '$http',
  function ($templateRequest, $sce, $q, $http) {

    /**
     * Given a url fetch the template as a string.
     * 
     * @param {String} url to template markup.
     * @returns {String} string representation of template.
     */
    function templateToString(url) {
      return $templateRequest($sce.getTrustedResourceUrl(url));
    }

    function httpGET(url) {
      var deferred = $q.defer();
      $http.get(url).success(function (response) {
        deferred.resolve(response);
      }).error(function (response) {
        deferred.reject();
      });
      return deferred.promise;
    }

    return({
      templateToString: templateToString,
      httpGET: httpGET
    });
  }]);