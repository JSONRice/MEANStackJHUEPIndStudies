(function () {
	"use strict";
	angular.module("mmAngularToc", []);
})();

(function () {
	"use strict";
	angular.module("mmAngularToc")
    .directive("mmToc", mmToc);

  function mmToc() {
    return {
			restrict: "A",
      template:
        "<div ng-repeat=\"(name, item) in tocItems\">" +
          "<div class=\"mm-toc-lead\" ng-if=\"item.lead\" ng-bind=\"name\"></div>" +
          "<div ng-repeat=\"(name, item) in item.sub\">" +
            "<a class=\"mm-toc-link-sub\" ng-href=\"{{item.link}}\">" +
              "<span class=\"mm-toc-name\" ng-bind=\"name\"></span>" +
              "<span>&nbsp;</span>" +
							"<span ng-if=\"noDotsFlag\" class=\"mm-toc-spacer-no-dots\"></span>" +
              "<span ng-if=\"!noDotsFlag\" class=\"mm-toc-spacer\" ng-bind=\"dots\"></span>" +
              "<span>&nbsp;</span>" +
              "<span ng-if=\"item.icon\" ng-bind=\"item.icon\"></span>" +
							"<span ng-if=\"item.glyphicon\" ng-class=\"item.glyphicon\"></span>" +
            "</a>" +
            "<div class=\"mm-toc-subsub\" ng-repeat=\"(name, item) in item.subsub\">" +
              "<a class=\"mm-toc-link-sub mm-toc-link-subsub\" ng-href=\"{{item.link}}\">" +
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
    }
  }
})();
