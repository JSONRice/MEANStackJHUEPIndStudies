/**
 * Custom directive for a standard non-branching Table of Contents. This can be tweaked.
 * @notice if an item has an isInternalLink set to true then that internal link needs
 * to be wrapped by the scroll-to directive. The scroll-to knows how to properly handle
 * internal linkage and does so by bypassing the enforced routing rules in client/javascript/app.js
 * Note that this is not a security violation but enforces security. The only way to add an internal
 * link is directly by editing the page. XSS attacks are nullified.
 * 
 * Sources: https://github.com/MMMalik/angular-toc
 */
meanstacktutorials.directive('toc', function () {
  return {
    restrict: "A",
    template:
            "<div id='toc' ng-repeat=\"(name, item) in tocItems\">" +
            "<div class=\"mm-toc-lead\" ng-if=\"item.lead\" ng-bind=\"name\">" +
            "<span ng-if=\"item.icon\" ng-bind=\"item.icon\"></span>" +
            "<span ng-if=\"item.glyphicon\" ng-class=\"item.glyphicon\"></span></div>" +    
            "<div ng-repeat=\"(name, item) in item.sub\">" +
            "<a class=\"mm-toc-link-sub\" ng-if=\"item.isInternalLink === false\" ng-href=\"{{item.link}}\">" +
            "<a class=\"mm-toc-link-sub\" ng-if=\"item.isInternalLink === true\" scroll-to=\"{{item.link}}\">" +
            "<span class=\"mm-toc-name\" ng-bind=\"name\"></span>" +
            "<span>&nbsp;</span>" +
            "<span ng-if=\"noDotsFlag\" class=\"mm-toc-spacer-no-dots\"></span>" +
            "<span ng-if=\"!noDotsFlag\" class=\"mm-toc-spacer\" ng-bind=\"dots\"></span>" +
            "<span>&nbsp;</span>" +
            "<span ng-if=\"item.icon\" ng-bind=\"item.icon\"></span>" +
            "<span ng-if=\"item.glyphicon\" ng-class=\"item.glyphicon\"></span>" +
            "</a>" +
            "<div class=\"mm-toc-subsub\" ng-repeat=\"(name, item) in item.subsub\">" +
            "<a class=\"mm-toc-link-sub mm-toc-link-subsub\" ng-if=\"item.isInternalLink === false\" ng-href=\"{{item.link}}\">" +
            "<a class=\"mm-toc-link-sub mm-toc-link-subsub\" ng-if=\"item.isInternalLink === true\" scroll-to=\"{{item.link}}\">" +
            "<span class=\"mm-toc-name\" ng-bind=\"name\"></span>" +
            "<span>&nbsp;</span>" +
            "<span ng-if=\"noDotsFlag\" class=\"mm-toc-spacer-no-dots\"></span>" +
            "<span ng-if=\"!noDotsFlag\" class=\"mm-toc-spacer\" ng-bind=\"dots\"></span>" +
            "<span>&nbsp;</span>" +
            "<span ng-if=\"item.icon\" ng-bind=\"item.icon\"></span>" +
            "<span ng-if=\"item.glyphicon\" ng-class=\"item.glyphicon\"></span>" +
            "</a>" +
            "</div>" +
            "</div>" +
            "</div>",
    scope: {
      tocItems: "=",
      noDots: "@"
    },
    link: function (scope) {
      scope.dots = "";
      if (scope.noDots === "") {
        scope.noDotsFlag = true;
      }
      if (typeof scope.noDots === "undefined") {
        scope.noDotsFlag = false;
        for (var i = 0; i < 200; i += 1) {
          scope.dots += ".";
        }
      }
    }
  };
});