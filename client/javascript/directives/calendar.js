meanstacktutorials.directive('calendar', function () {
  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: '../../templates/calendar.html',
    controller: 'calendarController'
  };
});

