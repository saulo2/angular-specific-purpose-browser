(function () {
    "use strict"

    var timesheet = angular.module("timesheet", ["angular-hal", "ngRoute", "ui.bootstrap"])

    timesheet.config(function($routeProvider) {
        $routeProvider.when("/", {})

        function when(path, templateUrl, controller, reloadOnSearch) {
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

        when("/project/creation", "project/projectEditing.html", "projectEditing")
        when("/project/:id/creationConfirmation", "project/projectCreationConfirmation.html")

        when("/project/search", "project/projectSearch.html", "projectSearch", false)

        when("/task/creation", "task/taskCreation.html")
        when("/task/search", "task/taskSearch.html")
    })
})()