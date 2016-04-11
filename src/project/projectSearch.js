(function() {
    "use strict"

    angular.module("timesheet").controller("projectSearch", function($location, $q, $route, $scope, url) {
        $scope.search = function(page) {
            var options = _.clone($scope.resource.form.options)
            options.page = page - 1
            options.size = 2
            var newUrl = url($scope.resource.$href("search", options))
            if (newUrl === $location.url()) {
                $route.reload()
            } else {
                $location.url(newUrl)
            }
        }

        function initializeResult(result) {
            $scope.page = result.page + 1

            return result.$get("projects").then(function(projects) {
                result.projects = projects
                return result
            })
        }

        function initializeResource(resource) {
            var promisses = []

            if (resource.$has("result")) {
                promisses.push(resource.$get("result")
                    .then(function(result) {
                        return initializeResult(result)
                    })
                    .then(function(result) {
                        resource.result = result
                    }))
            }

            return $q.all(promisses).then(function() {
                return resource
            })
        }

        initializeResource($route.current.locals.resource).then(function(resource) {
            $scope.resource = resource
        })

        $scope.$on("$routeUpdate", function() {
            $scope.resource.$get("otherResult", $location.search()).then(function (result) {
                initializeResult(result)
                $scope.resource.result = result
            })
        })
    })
})()