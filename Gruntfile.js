module.exports = function(grunt) {
    "use strict"

    grunt.initConfig({
        "bower-install-simple": {
            default: {
            }
        },
        
        concat: {
            default: {
                src: ["stubs/**/*.yaml"],
                dest: "tmp/stubs.yaml"
            }
        },
        
        stubby: {
            default: {
                options: {
                    mute: false,
                    watch: "tmp/stubs.yaml"
                },
                files: [{
                    src: "tmp/stubs.yaml"
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
                    scriptTemplate: '<script src="{{path.substring(3)}}"></script>',
                    openTag: "<!-- start template tags -->",
                    closeTag: "<!-- end template tags -->"
                },
                src: ["src/**/*.js", "!src/timesheet.js"],
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
                    {host: "localhost", port: 8001, context: "/css"},
                    {host: "localhost", port: 8001, context: "/bower_components"},
                    {host: "localhost", port: 8001, context: "/src"},
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
                files: ["index.html", "src/**/*.js"],
                tasks: ["copy", "tags"]
            },
            stubs: {
                files: ["stubs/**/*.yaml"],
                tasks: ["concat"]
            },
            reload: {
                options: {
                    livereload: true,
                },
                files: ["index.html", "src/**/*.{html,js}", "stubs/**/*.yaml"],
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