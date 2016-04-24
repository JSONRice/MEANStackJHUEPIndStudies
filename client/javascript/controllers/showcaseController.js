angular.module('meanstacktutorials').controller('ShowcaseController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    // forces synchronous request for file text
    $scope.getFileContent = function (uri) {
      console.log('Initiating HTTP GET: ' + uri);
      var request = new XMLHttpRequest();

      try {
        request.open('GET', uri, false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status !== 200) {
          throw 'file not found or server error.';
        }
      } catch (err) {
        console.log('Caught network exception: ' + err);
        return 'Failed to GET: ' + uri + '\n\nInvestigate the console logs.\n';
      }

      // Success
      var responseText = request.responseText;
      return request.responseText;
    };


    $scope.widgets = [
      {
        id: 'treetoc',
        title: 'Tree [Table of Contents]',
        markup: "<div ng-controller='TreeController'><tree tree-data='my_data' tree-control='my_tree' on-select='my_tree_handler(branch)' initial-selection='MEAN Stack Introduction'></tree></div>",
        files: [
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/controllers/treeController.js',
            title: 'Tree Controller',
            id: 'treecontroller'// ,
                    // content: getFileContent('https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/controllers/treeController.js')
          },
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/directives/tree.js',
            title: 'Tree Directive',
            id: 'treedirective'// ,
                    // content: getFileContent('https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/directives/tree.js')
          },
          {
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/templates/widgets/tree.html',
            title: 'Tree Template',
            id: 'treetemplate'// ,
                    // content: getFileContent('https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/templates/widgets/tree.html')
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
