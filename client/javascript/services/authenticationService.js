angular.module('meanstacktutorials').factory('AuthenticationService', [
  '$q',
  '$http',
  function ($q, $http) {

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
      setUserStatus: setUserStatus,
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
    
    function setUserStatus(pUser) {
      user = pUser;
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
      }).then(function (data) {
        if (data.status >= 200) {
          user = true;
          deferred.resolve(data);
        }
      }, function (data) {
        user = false;
        deferred.reject(data);
      });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/api/logout').then(function (data) {
        user = false;
        deferred.resolve(data);
      }, function (data) {
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
      }).then(function (data) {
        if (data.status >= 200 ) {
          deferred.resolve(data);
        }
      }, function (data) {
        deferred.reject();
      });

      // return promise object
      return deferred.promise;
    }
  }]);