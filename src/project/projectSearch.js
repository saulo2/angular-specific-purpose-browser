(function() {
    "use strict"

    angular.module("timesheet").controller("projectSearch", function($route, $scope) {        
        function initialize(resource) {
            $scope.resource = resource
        }

        initialize($route.current.locals.resource)
    })
})()