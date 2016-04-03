(function() {
    "use strict"

    angular.module("timesheet").factory("url", function($filter) {
        return function (href) {
            return $filter("href")(href, true)
        }
    })
})()