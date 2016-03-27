(function () {
    "use strict"

    var timesheet = angular.module("timesheet", ["angular-hal", "ngRoute"])

    timesheet.config(function($routeProvider) {
        $routeProvider.when("/", {})
        
        function when(path, controller, templateUrl) {
            $routeProvider.when(path, {
                controller: controller,
                templateUrl: templateUrl,
                resolve: {
                    resource: function($location, halClient, constants) {
                        return halClient.$get(constants.resourcePrefix + $location.url())
                    }
                }
            })
        }
        
        when("/projects/search", null, "src/project/projectSearch.html")
        when("/projects/creation", null, "src/project/projectCreation.html")
        
        when("/tasks/search", null, "src/task/taskSearch.html")
        when("/tasks/creation", null, "src/task/taskCreation.html")        
    })
})()