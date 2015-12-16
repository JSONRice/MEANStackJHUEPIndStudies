cleaningschedule.directive('calendar', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      template: 'calendar.html',
      controller: 'calendarController'
  };
});

