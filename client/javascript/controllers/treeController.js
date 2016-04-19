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
          ajax.getTemplate(branch.data.url).then(function (html) {
            $scope.output += html;
          }, function () {
            console.error('Failed to find template at:' + branch.data.url);
          });
        }
      }
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
              url: 'templates/tutorials/toc/meanIntro/meanIntro.html'
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
                  url: 'templates/tutorials/toc/meanIntro/angular.html'
                }
              },
              {
                label: 'NodeJS',
                data: {
                  url: 'templates/tutorials/toc/meanIntro/node.html'
                }
              }
            ]
          },
          {
            label: 'Server Side Overview',
            data: {
              url: 'templates/tutorials/toc/serverSideOverview/serverSideOverview.html'
            },
            children: [
              {
                label: 'NodeJS Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/nodeSetup.html"
                }
              },
              {
                label: 'ExpressJS Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/expressSetup/expressSetup.html"
                },
                children: [
                  {
                    label: 'ElectrolyteJS',
                    data: {
                      url: "templates/tutorials/toc/serverSideOverview/expressSetup/electrolyte.html"
                    }
                  }
                ]
              },
              {
                label: 'Mongoose Setup',
                data: {
                  url: "templates/tutorials/toc/serverSideOverview/mongooseSetup.html"
                }
              }
            ]
          },
          {
            label: 'Client Side Overview',
            data: {
              url: 'templates/tutorials/toc/clientSideOverview/clientSideOverview.html'
            },
            children: [
              {
                label: 'Angular Basics',
                data: {
                  url: 'templates/tutorials/toc/clientSideOverview/angularBasics.html'
                }
              },
              {
                label: 'Angular UI',
                data: {
                  url: 'templates/tutorials/toc/clientSideOverview/angularUI.html'
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

    $scope.my_data = treedata_mean;

    $scope.my_tree = tree = {};
    /* Optional showcase additional functionality
    $scope.try_changing_the_tree_data = function () {
      if ($scope.my_data === treedata_avm) {
        return $scope.my_data = treedata_geography;
      } else {
        return $scope.my_data = treedata_avm;
      }
    };
    
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
    };*/
  }
]);
