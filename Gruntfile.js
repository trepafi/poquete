module.exports = function(grunt) {
    var path = require('path');
    var liveReload = require('connect-livereload')();
    var modRewrite = require('connect-modrewrite');

    var poqueteConfig = {
        port: 8070,
        host: 'localhost',
        app: 'app',
        tmp: '.tmp',
        dist: 'dist',
        npm: 'node_modules',
        bower: 'bower_components',
        indexjs: 'index.js'  
    };

    var mountFolder = function (connect, dir) {
        //console.log(connect);
        return connect.static(path.resolve(dir));
    };

    // Project configuration.
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        poquete: poqueteConfig,
        cssmin: {
            combine: {
                options: {
                    banner: '/* <%= poquete.banner %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/css/poquete.min.css': [
                        '<%= poquete.bower %>/bootstrap/dist/css/bootstrap.css',
                        '<%= poquete.bower %>/bootstrap/dist/css/bootstrap-theme.css',
                        '<%= poquete.app %>/css/**/*.css',
                        '<%= poquete.app %>/components/**/*.css',
                        '<%= poquete.app %>/widgets/**/*.css'
                    ]
                }
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= poquete.bower %>/bootstrap/dist/fonts/*'],
                        dest: '<%= poquete.dist %>/fonts/',
                        filter: 'isFile'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= poquete.app %>/img',
                        src: ['**'],
                        dest: '<%= poquete.dist %>/img/'
                    }
                ]
            },
            index: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= poquete.app %>/index.html'],
                        dest: '<%= poquete.dist %>/',
                        filter: 'isFile'
                    }
                ]
            },
            configs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= poquete.app %>/i18n/*'],
                        dest: '<%= poquete.dist %>/i18n/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            temp: ['<%= poquete.tmp %>'],
            dist: ['<%= poquete.dist %>']
        },
        uglify: {
            app: {
                options: {
                    banner: '/*! poquete @ <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/js/poquete.min.js': ['<%= concat.app.dest %>']
                }
            },
            vendor: {
                options: {
                    banner: '/*! poquete <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/js/vendor.min.js': ['<%= concat.vendor.dest %>']
                }
            }
        },
        concat: {
            app: {
                options: {
                    banner: "(function(undefined){'use strict';\n",
                    process: function (src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    },
                    footer: '\n}());'
                },
                src: [
                    '<%= poquete.app %>/**/*.js',
                    '!<%= poquete.app %>/index*.js',
                    '<%= poquete.app %>/<%= poquete.indexjs %>'
                ],
                dest: '<%= poquete.dist %>/js/poquete.js'
            },
            vendor: {
                options: {
                    footer: '_.mixin(_.str.exports());'
                },
                src: [
                    '<%= poquete.bower %>/jquery/jquery.js',
                    '<%= poquete.bower %>/lodash/dist/lodash.js',
                    '<%= poquete.bower %>/underscore.string/lib/underscore.string.js',
                    '<%= poquete.bower %>/angular/angular.js',
                    '<%= poquete.bower %>/angular-animate/angular-animate.js',
                    '<%= poquete.bower %>/angular-cache/dist/angular-cache-1.2.0.js',
                    '<%= poquete.bower %>/angular-route/angular-route.js',
                    '<%= poquete.bower %>/angular-sanitize/angular-sanitize.js',
                    '<%= poquete.bower %>/angular-translate/angular-translate.js',
                    '<%= poquete.bower %>/angular-i18n/angular-locale_en.js'
                ],
                dest: '<%= poquete.dist %>/js/vendor.js'
            }
        },
        watch: {
            scripts: {
                files: [
                    '<%= poquete.app %>/**/*.html',
                    '<%= poquete.app %>/**/*.js',
                    '<%= poquete.app %>/**/*.json'
                ],
                tasks: ['scripts'],
                options: {
                    livereload: true 
                }
            },
            styles: {
                files: ['<%= poquete.app %>/**/*.css'],
                tasks: ['styles'],
                options: {
                    livereload: true
                }
            },
            index: {
                files: ['<%= poquete.app %>/index*.html'],
                options: {
                    livereload: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: '<%= poquete.port %>',
                    base: '<%= poquete.dist %>',
                    debug: true,
                    middleware: function (connect, options) {
                        // Have to return middlewares
                        return [
                            liveReload,
                            modRewrite([
                                '^/$ /index.html [L]',
                                '!\\.html|\\.js|\\.css|\\.json|\\.eot|\\.svg|\\.ttf|\\.woff|\\.jpg|\\.png|\\.gif$ /index-dev.html',
                            ]),
                            mountFolder(connect, poqueteConfig.dist)
                        ];
                    }
                }
            }
        }
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    //grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig(gruntConfig);

    // Default task(s).
    grunt.registerTask('vendor', ['concat:vendor', 'uglify:vendor']);
    grunt.registerTask('scripts', ['concat:app', 'uglify:app', 'clean:temp']);
    grunt.registerTask('styles', ['cssmin']);

    grunt.registerTask('default', ['clean', 'copy', 'vendor', 'scripts', 'styles']);
    grunt.registerTask('server', ['default', 'connect', 'concurrent']);
};
