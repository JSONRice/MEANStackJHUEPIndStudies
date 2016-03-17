/**
 * Sources: https://github.com/nickperkinslondon/angular-bootstrap-nav-tree
 */
angular.module('meanstacktutorials').controller('TreeController', [
  '$scope',
  '$timeout',
  'AjaxService',
  function ($scope, $timeout, ajax) {
    var apple_selected;
    var tree;
    var treedata_mean;
    var treedata_avm;
    var treedata_geography;

    $scope.my_tree_handler = function (branch) {
      $scope.output = "<h1>" + branch.label + "</h1>";
      if (branch.data) {
        if (branch.data.url) {
          ajax.templateToString(branch.data.url).then(function (templateStr) {
            $scope.output += templateStr;
          }, function () {
            console.error('Failed to find template at:' + branch.data.url);
          });
          console.log('treeController caught url data: ' + $scope.output);
        }
      }
      return $scope.output;
    };
    apple_selected = function (branch) {
      return $scope.output = "An Apple was selected! : " + branch.label;
    };
    treedata_mean = [{
        label: 'Table of Contents',
        data: {
          url: 'templates/tutorials/toc/toc.html'
        },
        children: [
          {
            label: 'MEAN Stack Introduction',
            data: {
              url: 'templates/tutorials/toc/meanIntro/meanIntro.html',
            },
            children: [
              {
                label: 'MongoDB',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/mongo.html'
                }
              }, 
              {
                label: 'ExpressJS',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/express.html'
                }
              }, 
              {
                label: 'AngularJS',
                data: {
                  description: "AngularJS (commonly referred to as \"Angular\" or \"Angular.js\") is an open-source web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications. It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications."
                }
              }, 
              {
                label: 'NodeJS',
                data: {
                  description: "Node.js is an open-source, cross-platform runtime environment for developing server-side Web applications. Although Node.js is not a JavaScript framework,[3] many of its basic modules are written in JavaScript, and developers can write new modules in JavaScript. The runtime environment interprets JavaScript using Google's V8 JavaScript engine."
                }
              }
            ]
          },
          {
            label: 'Server Side Overview',
            data: {
              description: "This tutorial will cover the server side processes of a MEAN stack web application.<br/>The server side integrates a minimal web framework referred to as ExpressJS along with tools such ElectrolyteJS to ensure Inversion of Control and Dependency Injection. NodeJS is the main web server framework that processes the main JavaScript file that leverages ExpressJS, ElectrolyteJS, MongooseJS (for MongoDB) and other tools to establish server side communications that are able to asynchronously communicate with the front end user interface modules."
            },
            children: [
              {
                label: 'NodeJS Setup',
                data: {
                  description: "TODO"
                }
              },
              {
                label: 'ExpressJS Setup',
                data: {
                  description: "TODO"
                },
                children: [
                  {
                    label: 'ElectrolyteJS',
                    data: {
                      description: "TODO"
                    }
                  }
                ]
              },
              {
                label: 'Mongoose Setup',
                data: {
                  description: "TODO"
                }
              }
            ]
          }
        ]}];

    // For demo purposes
    treedata_avm = [{
        label: 'Vegetable',
        data: {
          definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
          data_can_contain_anything: true
        },
        onSelect: function (branch) {
          return $scope.output = "Vegetable: " + branch.data.definition;
        },
        children: [
          {
            label: 'Oranges'
          }, {
            label: 'Apples',
            children: [
              {
                label: 'Granny Smith',
                onSelect: apple_selected
              }, {
                label: 'Red Delicous',
                onSelect: apple_selected
              }, {
                label: 'Fuji',
                onSelect: apple_selected
              }
            ]
          }
        ]
      }, {
        label: 'Mineral',
        children: [
          {
            label: 'Rock',
            children: ['Igneous', 'Sedimentary', 'Metamorphic']
          }, {
            label: 'Metal',
            children: ['Aluminum', 'Steel', 'Copper']
          }, {
            label: 'Plastic',
            children: [
              {
                label: 'Thermoplastic',
                children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
              }, {
                label: 'Thermosetting Polymer',
                children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
              }
            ]
          }
        ]
      }
    ];

    // For demo purposes
    treedata_geography = [
      {
        label: 'North America',
        children: [
          {
            label: 'Canada',
            children: ['Toronto', 'Vancouver']
          }, {
            label: 'USA',
            children: ['New York', 'Los Angeles']
          }, {
            label: 'Mexico',
            children: ['Mexico City', 'Guadalajara']
          }
        ]
      }, {
        label: 'South America',
        children: [
          {
            label: 'Venezuela',
            children: ['Caracas', 'Maracaibo']
          }, {
            label: 'Brazil',
            children: ['Sao Paulo', 'Rio de Janeiro']
          }, {
            label: 'Argentina',
            children: ['Buenos Aires', 'Cordoba']
          }
        ]
      }
    ];

    // The other tree datasets are mainly for test purposes and examples. Migrate these to a test controller in Jasmine (Karma).
    $scope.my_data = treedata_mean;
    $scope.try_changing_the_tree_data = function () {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function () {
      $scope.my_data = [];
      $scope.doing_async = true;
      return $timeout(function () {
        if (Math.random() < 0.5) {
          $scope.my_data = treedata_avm;
        } else {
          $scope.my_data = treedata_geography;
        }
        $scope.doing_async = false;
        return tree.expand_all();
      }, 1000);
    };
    return $scope.try_adding_a_branch = function () {
      var b;
      b = tree.get_selected_branch();
      return tree.add_branch(b, {
        label: 'New Branch',
        data: {
          something: 42,
          "else": 43
        }
      });
    };
  }
]);
