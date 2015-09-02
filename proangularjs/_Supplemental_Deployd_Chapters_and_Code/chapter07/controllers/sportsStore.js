angular.module("sportsStore")
    .constant("dataUrl", "https://api.parse.com/1/classes/Products")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "Mc0i2Q6FZNovOr4bQD6QRFwzgw4iRHOy2JcDYuLq";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "h4dnGScEtCWMMjaWmCJYNBZrDCrnR0ZmsKvEwXLD";
    })
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {

        $scope.data = {};

        $http.get(dataUrl)
            .success(function (data) {
                $scope.data.products = data.results;

            })
            .error(function (response) {
                $scope.data.error = response.error || response;
            });
    });
