(function() {
    "use strict"

    angular.module("timesheet").controller("menu", function($scope, halClient, configuration) {
        halClient.$get(configuration.resourcePrefix + "/").then(function(resource) {
            $scope.resource = resource
        })
    })
})()