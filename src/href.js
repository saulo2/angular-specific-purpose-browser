(function() {
    "use strict"

    angular.module("timesheet").filter("href", function(configuration) {
        return function(href, withoutHash) {
            if (href) {
                var resource = URI(href).resource()
                var index = resource.indexOf(configuration.resourcePrefix)
                if (index > 0) {
                    resource = resource.substring(index + configuration.resourcePrefix.length)
                    if (withoutHash) {
                        return resource
                    } else {
                        return "#" + resource
                    }
                }
            }
            return href
        }
    })
})()