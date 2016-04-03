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
                    resource: function($location, halClient, configuration) {
                        return halClient.$get(configuration.resourcePrefix + $location.url())
                    }
                }
            })
        }

        when("/project/search", null, "project/projectSearch.html")
        when("/project/creation", "projectEditing", "project/projectEditing.html")
        when("/project/creationConfirmation", null, "project/projectCrationConfirmation.html")

        when("/task/search", null, "task/taskSearch.html")
        when("/task/creation", null, "task/taskCreation.html")        
    })
})()