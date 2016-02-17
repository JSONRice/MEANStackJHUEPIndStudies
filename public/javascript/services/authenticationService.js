angular.module('meanstacktutorials').service('AuthenticationService', [
  '$http',
  '$q',
  '$timeout',
  function ($http, $q, $timeout) {
    var user = null;



    return ({
      isLoggedIn: function () {
        if (user) {
          return true;
        } else {
          return false;
        }
      },
      getUserStatus: function () {
        return user;
      },
      login: function (username,
              firstName, lastName, password,
              age, registrationDate, isAdmin) {
        // create a new deferred (promise) instance
        var deferred = $q.defer();
        // Send POST to api.js (route file)
        $http.post('/login', {
          username: username,
          password: password
        })
                .success(function (data, status) {
                  if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                  } else {
                    user = false;
                    deferred.reject();
                  }
                })
                .error(function (data) {
                  user = false;
                  deferred.reject();
                });

        // return promise JSON
        return deferred.promise;
      },
      logout: function () {
        // create a new deferred (promise) instance
        var deferred = $q.defer();

        // Send GET to api.js (route file)
        $http.get('/logout')
                .success(function (data) {
                  user = false;
                  deferred.resolve();
                })
                .error(function (data) {
                  user = false;
                  deferred.reject();
                });

        return deferred.promise;
      },
      registration: function (emailUsername,
              firstName, lastName, password,
              age, registrationDate) {
        // create a new deferred (promise) instance
        var deferred = $q.defer();

        // Send POST to api.js (route file):
        $http.post('/register', {
          username: emailUsername,
          firstName: firstName,
          lastName: lastName,
          password: password,
          age: age,
          registrationDate: registrationDate
        })
                .success(function (data, status) {
                  if (status === 200 && data.status) {
                    deferred.resolve();
                  } else {
                    deferred.reject();
                  }

                })
                .error(function (data) {
                  deferred.reject();
                });

        return deferred.promise;

      }
    });

  }
]);