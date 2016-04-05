(function() {
    "use strict"

    angular.module("timesheet").controller("projectSearch", function($location, $route, $scope, url) {
        $scope.search = function(page) {
            var options = _.clone($scope.resource.form.options)
            options.page = page - 1
            options.size = 2
            var newUrl = url($scope.resource.$href("search", options))
            if ($location.url() === newUrl) {
                $route.reload()
            } else {
                $location.url(newUrl)
            }            
        }

        function initializeResult(result) {
            $scope.page = result.page + 1
        }

        function initialize(resource) {
            if (resource.result) {
                initializeResult(resource.result)
            }
            $scope.resource = resource
        }

        initialize($route.current.locals.resource)

        $scope.$on("$routeUpdate", function() {
            $scope.resource.$get("result", $location.search()).then(function(result) {
                $scope.resource.result = result
                initializeResult(result)
            })
        })
    })
})()