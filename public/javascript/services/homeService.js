angular.module('cleaningschedule').service('homeservice', [
  '$http',
  function($http) {
   var homeDropVisible = true;
   return {
     setHomeDropVisibility: function(value) {
       homeDropVisible = value;
     },
     isHomeDropdownVisible: function() {
       return homeDropVisible;
     }
   };
  }
]);