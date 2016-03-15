/**
 * Version service for /api/versions (Mongoose)
 */
angular.module('meanstacktutorials').factory('VersionService', [
  '$q',
  '$http',
  function ($q, $http) {
    return({
      getVersionData: getVersionData
    });
    
    // Fetch version data from Mongo version collection:
    function getVersionData() {
        var deferred = $q.defer();
        var httpPromise = $http.get('/api/versions');
 
        httpPromise.success(function (versions) {
          deferred.resolve(versions);
          // TODO: sort versions (optional)
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
        return deferred.promise;      
    }    
  }
]);
