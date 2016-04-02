(function() {
    "use strict"

    angular.module("timesheet").controller("projectEditing", function($route, $scope) {
        $scope.save = function() {
            $scope.resource.$post("save", null, $scope.resource.project)
        }
        
        function initialize(resource) {
            $scope.resource = resource
        }
        
        initialize($route.current.locals.resource)
    })
})()