(function() {
    "use strict"

    angular.module("timesheet").filter("href", function(constants) {
        return function(href, withoutHash) {
            if (href) {
                var resource = URI(href).resource()
                var index = resource.indexOf(constants.resourcePrefix)
                if (index > 0) {
                    resource = resource.substring(index + constants.resourcePrefix.length)
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