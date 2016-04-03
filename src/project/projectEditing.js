(function() {
    "use strict"

    angular.module("timesheet").controller("projectEditing", function($location, $route, $scope, url) {
        $scope.save = function() {
            $scope.resource.$post("save", null, $scope.resource.project).then(function(redirect) {
                $location.url(url(redirect.location))
            })
        }

        function initialize(resource) {
            $scope.resource = resource
        }
        
        initialize($route.current.locals.resource)
    })
})()