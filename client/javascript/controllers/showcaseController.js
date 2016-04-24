angular.module('meanstacktutorials').controller('ShowcaseController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    $scope.widgets = [
      {
        id: 'treetoc',
        title: 'Tree [Table of Contents]',
        markup: "<div ng-controller='TreeController'><tree tree-data='my_data' tree-control='my_tree' on-select='my_tree_handler(branch)' initial-selection='MEAN Stack Introduction'></tree></div>",
        files: [
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/controllers/treeController.js',
            title: 'Tree Controller',
            id: 'treecontroller'
          },
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/directives/tree.js',
            title: 'Tree Directive',
            id: 'treedirective'
          },
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/templates/widgets/tree.html',
            title: 'Tree Template',
            id: 'treetemplate'
          }
        ]
      }
    ];

    /**
     * Given a unique id (namespace) fetch the widget. This is used by the showcase directive to set
     * the showcase widget.
     * 
     * @param {type} id the namespace or unique identifier for the widget. This is
     * needed to return a specific widget.
     * @returns {widget} the widget object contained within the list of widgets
     */
    $scope.getWidget = function (id) {
      for (var i in $scope.widgets) {
        if ($scope.widgets[i].id === id) {
          return $scope.widgets[i];
        }
      }
      console.error('no widget found returning null');
      return null;
    };
  }
]);
