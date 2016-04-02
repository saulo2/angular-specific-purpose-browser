(function () {
    "use strict"

    var timesheet = angular.module("timesheet", ["angular-hal", "ngRoute"])

    timesheet.config(function($routeProvider) {
        $routeProvider.when("/", {})
        
        function when(path, controller, templateUrl) {
            $routeProvider.when(path, {
                controller: controller,
                templateUrl: "src/" + templateUrl,
                resolve: {
                    resource: function($location, halClient, constants) {
                        return halClient.$get(constants.resourcePrefix + $location.url())
                    }
                }
            })
        }
        
        when("/projects/search", null, "project/projectSearch.html")
        when("/projects/creation", "projectEditing", "project/projectEditing.html")
        
        when("/tasks/search", null, "task/taskSearch.html")
        when("/tasks/creation", null, "task/taskCreation.html")        
    })
})()