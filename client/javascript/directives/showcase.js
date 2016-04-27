/** 
 * Custom directive that represents a showcase component. The showcase components 
 * are also referred to as 'widgets' and are served up from the templates. This makes 
 * it trivial to showcase a widget for display to the user and is the directive 
 * of choice for the Angular UI tutorials within this web app.
 */
meanstacktutorials.directive('showcase', [
  'AjaxService',
  function (ajax) {
    return {
      restrict: 'E',
      templateUrl: "../../templates/widgets/showcase.html",
      /**
       * 'widget' is a single widget object that contains a list of file 
       * objects and conforms to the following schema -
       $scope.widget = 
       {
       id: 'somewidget',
       title: 'Some Widget',
       markup: 'HTML markup that of the template that is safely rendered to screen',
       files: [
       {
       uri: 'http://somewidgetfileuri.com/somewidgetfile.js',
       title: 'Some Widget File Title',
       description: 'Some Widget File Description'
       },
       // ... more file objects ...
       ]
       }
       * The developer must provide a unique id. This is a namespace for the widget and is solely used by
       * the showcase controller to extract the desired widget from the list of widgets in the showcase
       * controller.
       * 
       * The uri is the link to a remote file. A filter is applied to extract the last word from the '/' so
       * be careful to ensure that you provide an accurate file. For example if the 'somefile.js' is omitted
       * from the above example then your filename will be 'somefileuri.com' The filter makes a best attempt
       * at guessing your file.
       * 
       * The file title and descriptions are optional but recommended. If none are provided a user will just
       * see the code but if the title and description are provided a well formatted panel with these items
       * (either or) will be display prior to the file content.
       * 
       * Note: the showcase controller contains a list of widget objects for showcasing.
       */
      scope: {
        widget: '=',
        templateuri: '='
      },
      link: function (scope) {
        // destructor
        scope.$on(
                "$destroy",
                function destroy() {
                  scope.lastFileFetched = scope.templateCached = "";
                });
                
        var request = new XMLHttpRequest();
        /* Fetch just the template content on load: */
        try {
          request.open('GET', scope.templateuri, false);  // `false` makes the request synchronous
          request.send(null);

          if (request.status !== 200) {
            throw 'file not found or server error.';
          }
        } catch (err) {
          console.error('Caught network exception: ' + err);
          return 'Failed to GET: ' + scope.templateuri + '\n\nInvestigate the console logs.\n';
        }
        scope.templateCached = request.responseText;

        // since the requests are synchronous this variable is guaranteed to contain the last file fetched
        scope.lastFileFetched = "";

        // Synchronous request for a file.
        // Since the source files are so small and order is necessary just pull them in synchronously.
        // Note: do not pull in larger files (e.g. 5Mb or higher) with this function. If you have
        // a large file then you'll need to write up a new AJAX function with some order logic.
        scope.getFileContent = function (uri) {
          scope.lastFileFetched = "";

          console.log('fetching file from: ' + uri);
          var request = new XMLHttpRequest();

          try {
            request.open('GET', uri, false);  // `false` makes the request synchronous
            request.send(null);

            if (request.status !== 200) {
              throw 'file not found or server error.';
            }
          } catch (err) {
            console.error('Caught network exception: ' + err);
            return 'Failed to GET: ' + uri + '\n\nInvestigate the console logs.\n';
          }

          scope.lastFileFetched = request.responseText;
          return request.responseText;
        };
      }
    };
  }
]);
