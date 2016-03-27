(function() {
    "use strict"

    angular.module("timesheet").controller("menu", function($scope, halClient, constants) {
        halClient.$get(constants.resourcePrefix + "/").then(function(resource) {
            $scope.resource = resource
        })
    })
})()