module.exports = function(grunt) {
    "use strict"

    var src = ["src/**/*.js", "!src/timesheet.js"]
    var stubs = ["stubs/**/*.yaml"]
    var concatenatedStubs = "tmp/stubs.yaml"
    var rootPort = 8001

    grunt.initConfig({
        "bower-install-simple": {
            default: {
            }
        },
        
        concat: {
            default: {
                src: stubs,
                dest: concatenatedStubs
            }
        },
        
        stubby: {
            default: {
                options: {
                    mute: false,
                    watch: concatenatedStubs
                },
                files: [{
                    src: concatenatedStubs
                }]
            }
        },
        
        copy: {
            default: {
                files: [{
                    src: ["index.html"],
                    dest: "tmp/index.html"
                }]
            }            
        },
        
        tags: {
            default: {
                options: {
                    scriptTemplate: '<script src="{{path}}"></script>',
                    openTag: "<!-- start template tags -->",
                    closeTag: "<!-- end template tags -->"
                },
                src: src,
                dest: "tmp/index.html"
            }
        },

        connect: {
            tmp: {
                options: {
                    middleware: function(connect, options, defaultMiddleware) {
                        var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest
                        return [proxy].concat(defaultMiddleware);
                    },
                    base: ["tmp"]
                },
                proxies: [
                    {host: "localhost", port: rootPort, context: "/bower_components"},
                    {host: "localhost", port: rootPort, context: "/src"},
                    {host: "localhost", port: 8882, context: "/rest"}
                ]
            },
            root: {
                options: {
                    port: 8001
                }
            }
        },

        watch: {
            src: {
                files: src,
                tasks: ["tags"]
            },
            stubs: {
                files: stubs,
                tasks: ["concat"]
            }
        }
    })

    require("load-grunt-tasks")(grunt)

    grunt.registerTask("default", [
        "bower-install-simple",
        "concat",
        "stubby",
        "copy",
        "tags",
        "configureProxies:tmp",
        "connect",
        "watch"
    ])
}