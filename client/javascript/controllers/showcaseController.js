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
      },
      {
        id: 'intoc',
        title: 'Inline Table of Contents',
        templateuri: '../../templates/showcase/inToCShowcase.html',
        description: "Welcome to the showcase page for the inline ToC (Table of Contents) used within the web app. This simple inline directive-based ToC was originally developed by Michal Malik of Warsaw, Poland. His username on Github is MMMalik. Michal agreed to allowing this directive to be used and extended under the MIT Free Open Source Software License. What's neat about this inline ToC component is that it is combined with the scrollTo directive if links are local (inline) to the page. Have fun exploring and using this component.", 
        files: [
          {
            fileuri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/controllers/inlineToCController.js',
            title: 'Inline ToC Controller',
            id: 'inlinetoccontroller'
          },
          {
            fileuri: 'https://raw.githubusercontent.com/jasonwr/MEANStackJHUEPIndStudies/master/client/javascript/directives/toc.js',
            title: 'Inline ToC Directive',
            id: 'inlinetocdirective'
          }         
        ]
      },
      {
        id: 'calendar',
        title: 'Calendar',
        templateuri: '../../templates/showcase/calendarShowcase.html',
        description: 'Simple calendar directive similar to the jQuery UI calendar. The UI Calendar is flexible and has an assortment of functionality. The one drawback of this calendar directive is that you must install a bunch of dependencies based off of the fullcalendar.js (open source JavaScript calendar) along with the custom CSS. Check out the main index.ejs view in the server directory for a list of dependencies. These should be updated from time-to-time.<p>The following Angular Calendar component is based off of the JS Arshaw Full Calendar located here: <a href="http://arshaw.com/fullcalendar/">Arshaw FullCalendar</a>.</p>',
        files: [
          {
            
          },
          {
            
          },
          {
            
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
