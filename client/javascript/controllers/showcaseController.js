angular.module('meanstacktutorials').controller('ShowcaseController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    // TODO: replace markup with a templateuri and get this to load through AJAX within the directive
    $scope.widgets = [
      {
        id: 'treetoc',
        title: 'Tree [Table of Contents]',        
        markup: "<div ng-controller=TreeController><table><tr><td style=vertical-align:top;padding:20px><h6>by Nick Perkins</h6><a href=https://github.com/nickperkinslondon/angular-bootstrap-nav-tree>The code is on Github</a><br/><ul class=\"list-group nav nav-list\"><br/><table><tr><td style=vertical-align:top><br><button class=\"btn btn-default btn-sm\"ng-click=try_changing_the_tree_data()>Change The Tree Definition</button><br><button class=\"btn btn-default btn-sm\"ng-click=try_async_load()>Load Tree Data Asynchronously</button><br/><h5>Test the Tree Control API:</h5><br><button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_first_branch()>First Branch</button><br><button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_next_sibling()>Next Sibling</button> <button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_prev_sibling()>Prev Sibling</button><br><button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_next_branch()>Next Branch</button> <button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_prev_branch()>Prev Branch</button><br><button class=\"btn btn-default btn-sm\"ng-click=my_tree.select_parent_branch()>Parent</button><br/><button class=\"btn btn-default btn-sm\"ng-click=my_tree.expand_branch()>Expand</button> <button class=\"btn btn-default btn-sm\"ng-click=my_tree.collapse_branch()>Collapse</button> <button class=\"btn btn-default btn-sm\"ng-click=my_tree.expand_all()>Expand All</button> <button class=\"btn btn-default btn-sm\"ng-click=my_tree.collapse_all()>Collapse All</button><br/><button class=\"btn btn-default btn-sm\"ng-click=try_adding_a_branch()>Add Branch</button><td style=vertical-align:top><div style=\"width:250px;margin-left:100px;background:#f5f5f5;border:1px solid #d3d3d3;border-radius:5px\"><span ng-if=doing_async>...loading...</span><tree expand-level=2 initial-selection=\"Granny Smith\"on-select=my_tree_handler(branch) tree-control=my_tree tree-data=my_data></tree></div><td style=padding:20px;vertical-align:top><br/><div style=width:300px class=\"alert alert-warning\">{{ output}}</div></table></table></div>",
        description: "This is the test page for the tree based ToC (Table of Contents) used within the web app as the tree ToC over on the left side. Try the tree API and source files used within the showcase (at the bottom)."
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
            uri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/templates/widgets/treeTest.html',
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
