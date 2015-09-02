angular.module("exampleApp", ["increment", "ngResource", "ngRoute", "ngAnimate"])
.constant("baseUrl", "https://api.parse.com/1/classes/Products/")
.factory("productsResource", function ($resource, baseUrl) {

    return $resource(baseUrl + ":id", { id: "@objectId" }, {
        query: {
            method: "GET", isArray: true, transformResponse: function (data, headers) {
                return JSON.parse(data).results;
            }
        },
        update: { method: "PUT" }
    });
})
.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when("/edit/:id", {
        templateUrl: "/editorView.html",
        controller: "editCtrl"
    });

    $routeProvider.when("/create", {
        templateUrl: "/editorView.html",
        controller: "editCtrl"
    });

    $routeProvider.otherwise({
        templateUrl: "/tableView.html",
        controller: "tableCtrl",
        resolve: {
            data: function (productsResource) {
                return productsResource.query();
            }
        }
    });

})
.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Parse-Application-Id"]
        = "7uRKj9WGCnHTZ136SAbh7N3TBI3NyWrpgWTgomjp";
    $httpProvider.defaults.headers.common["X-Parse-REST-API-Key"]
        = "aeZgyAPTIKbs6YAsCNyySu0RW53xeKrPC6DUUqSw";
})
.controller("defaultCtrl", function ($scope, $location, $routeParams, productsResource) {

    $scope.data = {}

    $scope.currentProduct = null;

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.data.products.splice($scope.data.products.indexOf(product), 1);
        })
    }

    $scope.createProduct = function (product) {
        var newProduct = new productsResource(product);
        newProduct.$save().then(function (response) {
            $scope.data.products.push(angular.extend(newProduct, product));
            $location.path("/list");
        });
    }
})
.controller("tableCtrl", function ($scope, $location, $route, data) {

    $scope.data.products = data;

    $scope.refreshProducts = function () {
        $route.reload();
    }
})
.controller("editCtrl", function ($scope, $routeParams, $location) {

    $scope.currentProduct = null;

    if ($location.path().indexOf("/edit/") == 0) {
        var id = $routeParams["id"];
        for (var i = 0; i < $scope.data.products.length; i++) {
            if ($scope.data.products[i].objectId == id) {
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }
    }

    $scope.cancelEdit = function () {
        $location.path("/list");
    }

    $scope.updateProduct = function (product) {
        angular.copy(product).$update().then(function () {
            $location.path("/list");
        });
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.objectId)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    }
});

