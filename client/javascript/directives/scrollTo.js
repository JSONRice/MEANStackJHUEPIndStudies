/**
 * Use this directive for internal links scrolling. This enforces routing security as
 * id's hardcoded into the url will still be redirected to the login page. However
 * any page that utilizes this directive will have internal links.
 * 
 * Ex:
 * 
 * <a inner-link='foo'>foo</a>
 * <!--
 *  ...
 *  ...
 *  Some HTML would be here.
 *  ...
 *  ...
 * --> 
 * <div id='foo'>Some text would go here. This is what gets linked to.</div>
 * 
 * Sources: http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs
 */
meanstacktutorials.directive('scrollTo', function ($location, $anchorScroll) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('click', function (event) {
        event.stopPropagation();
        var off = scope.$on('$locationChangeStart', function (ev) {
          off();
          ev.preventDefault();
        });
        var location = attrs.scrollTo;
        $location.hash(location);
        $anchorScroll();
      });
    }
  };
});