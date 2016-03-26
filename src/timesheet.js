(function () {
    "use strict"

    var timesheet = angular.module("timesheet", ["angular-hal", "ngRoute"])

    timesheet.config(function ($routeProvider) {
        function when(path, controller, template) {
            $routeProvider.when(path, {
                controller: controller,
                template: template,
                resolve: {
                    resource: function ($location, halClient) {
                        return halClient.$get("rest" + $location.url())
                    }
                }
            })
        }

        when("/", function ($scope, $route) {
            console.log(arguments)
        }, "{{resource}}")
    })
})()