/**
 * Controller for the Angular Basics template that utilizes the custom TOC directive.
 * The TOC directive is not to be confused with the Tree directive as the TOC directive
 * is a simpler layout of a TOC (Table Of Contents) and doesn't have branches or
 * collapsible items, but rather is a hub of anchor links. Note that all the links
 * contained are internal to the page, and these internal links use the custom scrollTo
 * directive, in order to perform page bound linking without having to go through the
 * custom route table in the client/javascript/app.js file.
 */
angular.module('meanstacktutorials').controller('AngularBasicsController', [
  '$location',
  '$scope',
  function ($location, $scope) {
    // $scope.ajaxServiceCode = 
    
    $scope.tocItems = {
      "Traditional Web Transactions": {
        lead: true,
        sub: {
          "Routing with HTTP": {
            link: "traditionalintro",
            isInternalLink: true
            // No need for icons, but if you want to add one here it is:
            // icon: "1"
            // No need for sub sub links but an example of doing that is as follows:
            /*
            subsub: {
              "Sub Sub Link": {
                link: "#subsub",
                isInternalLink: true
              },
            }
            */
          },
          "Traditional Web Routing Illustration": {
            link: "traditionalillustration",
            isInternalLink: true
          }        
        }
      },
      "AJAX and SPA": {
        lead: true,
        sub: {
          "Emergence of JavaScript and AJAX": {
            link: "jsandajax",
            isInternalLink: true
            // Glyphicons from Twitter Bootstrap may be used. Here's an example.
            // glyphicon: "glyphicon glyphicon-star"
          },
          "SPA Illustration" : {
            link: "spaillustration",
            isInternalLink: true            
          },
          "SPA Continued": {
            link: "spacontinued",
            isInternalLink: true
          }
        }
      },
      "Angular Fundamentals": {
        lead: true,
        sub: {
          "Angular Controllers": {
            link: "angularcontrollers",
            isInternalLink: true
          },
          "Angular Services": {
            link: "angularservices",
            isInternalLink: true
          },
          "Angular Templates": {
            link: "angulartemplates",
            isInternalLink: true
          },
          "Angular Directives": {
            link: "angulardirectives",
            isInternalLink: true
          }          
        }
      }
      
    };
  }
]);