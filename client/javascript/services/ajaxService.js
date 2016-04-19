angular.module('meanstacktutorials').service('AjaxService', [
  '$templateRequest',
  '$sce',
  '$q',
  '$http',
  function ($templateRequest, $sce, $q, $http) {

    /**
     * Given a url fetch the template markup.
     * 
     * @param {String} url to template markup.
     * @return {promise} AJAX promise to receive the template markup from the url.
     */
    function getTemplate(url) {
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
      getTemplate: getTemplate,
      httpGET: httpGET
    });
  }]);