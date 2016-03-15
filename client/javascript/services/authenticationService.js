angular.module('meanstacktutorials').factory('AuthenticationService', [
  '$q', 
  '$timeout', 
  '$http',
  function ($q, $timeout, $http) {

    // user was successfully logged in ~ used for user status
    var user = null;
    
    // place all data to share between controllers in here
    var data = {username: ""};

    // return available functions and data for use in controllers
    // note this is a method for sharing data between controllers and
    // data in here is persisted (doesn't get cleared)
    return ({
      setUsername: setUsername,
      getUsername: getUsername,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      data: data
    });
    
    function setUsername(username) {
      this.data.username = username;
    }
    
    function getUsername() {
      return this.data.username;
    }

    function isLoggedIn() {
      return (user) ? user : false;
    }

    function getUserStatus() {
      return user;
    }

    function login(username, password) {

      // create a new instance of deferred (promise)
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/api/login', {
        username: username, 
        password: password
      })
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/api/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    // register new user in Mongo
    function register(username, firstname, lastname, password) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send an HTTP POST request to the server (Mongoose)
      
      $http.post('/api/register', {
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password
      })
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }
}]);