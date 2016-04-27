angular.module('meanstacktutorials').controller('ShowcaseController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    $scope.widgets = [
      {
        id: 'treetoc',
        title: 'Tree [Table of Contents]',        
        templateuri: '../../templates/showcase/treeShowcase.html',
        description: "Welcome to the showcase page for the tree based ToC (Table of Contents) used within the web app. Try the tree API and view the source files (at the bottom). If you click on \"Change the Tree Definition\" you'll get some different data sets to play with otherwise you'll just see the default MEAN stack data set already used in the main tree ToC. Have fun exploring.",
        files: [
          {
            fileuri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/controllers/treeController.js',
            title: 'Tree Controller',
            id: 'treecontroller'
          },
          {
            fileuri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/directives/tree.js',
            title: 'Tree Directive',
            id: 'treedirective'
          },
          {
            fileuri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/templates/widgets/tree.html',
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
