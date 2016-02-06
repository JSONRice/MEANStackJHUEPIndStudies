angular.module('meanstacktutorials').service('homeService', [
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