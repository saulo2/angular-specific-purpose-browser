(function() {
    "use strict"

    angular.module("timesheet").factory("configuration", function() {
        return {
            resourcePrefix: "rest"
        }
    })
})()