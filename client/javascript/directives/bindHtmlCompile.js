/**
 * Use this instead of ng-bind-html to $compile inner HTML. ng-bind-html only evaluates HTML as a string and does
 * not $compile. This is useful if your embedded HTML has live elements such as Angular Bootstrap elements.
 * 
 * Warning: this direcitve does not assume HTML is safe. If you trust the HTML then you must filter that
 * (through unsafe) prior to this directive as this directive uses $watch and the filter pipe will break the 
 * $watch
 */
meanstacktutorials.directive('bindHtmlCompile', ['$compile', '$sce', function ($compile, $sce) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(function () {
          return scope.$eval(attrs.bindHtmlCompile);
        }, function (value) {
          element.html(value);
          $compile(element.contents())(scope);
        });
      }
    };
  }]);