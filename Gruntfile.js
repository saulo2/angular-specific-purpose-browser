module.exports = function(grunt) {
    "use strict"

    var src = ["src/**/*.js"]
    var stubs = ["stubs/**/*.yaml"]
    var stub = "tmp/stub.yaml"

    grunt.initConfig({
        tags: {
            default: {
                options: {
                    scriptTemplate: '<script src="{{path}}"></script>',
                    openTag: "<!-- start template tags -->",
                    closeTag: "<!-- end template tags -->"
                },
                src: src,
                dest: "index.html"
            }
        },

        connect: {
            default: {
                options: {
                    middleware: function(connect, options, defaultMiddleware) {
                        var proxy = require("grunt-connect-proxy/lib/utils").proxyRequest
                        return [proxy].concat(defaultMiddleware);
                    }
                },
                proxies: [{
                    context: "/rest",
                    host: "localhost",
                    port: "8882"
                }]
            }
        },

        stubby: {
            default: {
                options: {
                    watch: stub
                },
                files: [{
                    src: stubs
                }]
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
        },

        concat: {
            default: {
                src: stubs,
                dest: stub
            }
        }
    })

    //grunt.loadNpmTasks("grunt-script-link-tags")
    //grunt.loadNpmTasks("grunt-connect-proxy")
    //grunt.loadNpmTasks("grunt-contrib-connect")
    //grunt.loadNpmTasks("grunt-stubby")
    //grunt.loadNpmTasks("grunt-contrib-watch")
    //grunt.loadNpmTasks("grunt-contrib-concat")

    require("load-grunt-tasks")(grunt)

    grunt.registerTask("default", ["tags", "configureProxies:default", "connect", "stubby", "watch"])
}