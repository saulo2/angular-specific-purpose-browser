(function () {
    "use strict"

    var timesheet = angular.module("timesheet", ["angular-hal", "ngRoute", "ui.bootstrap"])

    timesheet.config(function($routeProvider) {
        $routeProvider.when("/", {})

        function when(path, templateUrl, controller, reloadOnSearch, constants) {
            if (!controller) {
                controller = function($route, $scope) {
                    $scope.resource = $route.current.locals.resource
                }
            }
            $routeProvider.when(path, {
                templateUrl: "src/" + templateUrl,
                controller: controller,
                reloadOnSearch: reloadOnSearch,
                resolve: {
                    resource: function($location, halClient, configuration) {
                        return halClient.$get(configuration.resourcePrefix + $location.url())
                    }
                }
            })
        }

        when("/project/search", "project/projectSearch.html", "projectSearch", false)
            when("/project/:id/edit", "project/projectEdit.html", "projectEdit")
                when("/project/:id/saveConfirmation", "project/projectSaveConfirmation.html")
                when("/project/:id/deletionConfirmation", "project/projectDeletionConfirmation.html", "projectEdit")
                    when("/project/deletionSuccess", "project/projectDeletionSuccess.html")

        when("/project/creation", "project/projectEdit.html", "projectEdit")
            when("/project/:id/creationConfirmation", "project/projectCreationConfirmation.html")

        when("/task/search", "task/taskSearch.html")

        when("/task/creation", "task/taskCreation.html")
    })
})()