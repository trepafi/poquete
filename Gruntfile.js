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
        vendors: 'app/vendors',
        indexjs: 'index.js',
        hosts: {
            staging: 'poquete.dev',
            production: 'www.poquete.com'
        },
        setHost: function (host, port) {
            this.host = host;
            this.port = port;
        },
        getHost: function () {
            return this.port ? (this.host + ':' + this.port) : this.host;
        },
        isProd: function () {
            return this.getHost() === this.hosts.production;
        }
    };

    poqueteConfig.date = grunt.template.today('yyyy-mm-dd HH:MM:ss');
    poqueteConfig.banner = grunt.template.process('poquete (<%= date %>)', { data: { date: poqueteConfig.date } });
    
    var mountFolder = function (connect, dir) {
        //console.log(connect);
        return connect.static(path.resolve(dir));
    };

    // Project configuration.
    var gruntConfig = {
        poquete: poqueteConfig,
        ngtemplates: {
            app: {
                cwd: '<%= poquete.app %>',
                src: [
                    'components/**/*.html',
                    'widgets/**/*.html'
                ],
                dest: '<%= poquete.tmp %>/templates.js',
                options: {
                    module: 'lt',
                    url: function (url) {
                        return '/' + url;
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return "(function(){ angular.module('" + module + "').run(['$templateCache', function($templateCache) { " + script + " }]); })();";
                    }
                }
            }
        },
        ngmodules: {
            components: {
                src: ['<%= poquete.app %>/components/**/*.js'],
                dest: '<%= poquete.tmp %>/components.js'
            },
            services: {
                src: ['<%= poquete.app %>/services/**/*.js'],
                dest: '<%= poquete.tmp %>/services.js'
            },
            utils: {
                src: ['<%= poquete.app %>/utils/**/*.js'],
                dest: '<%= poquete.tmp %>/utils.js'
            },
            widgets: {
                src: ['<%= poquete.app %>/widgets/**/*.js'],
                dest: '<%= poquete.tmp %>/widgets.js'
            }
        },
        concat: {
            config: {
                options: {
                    banner: "(function() {\nlt.build = { sha: '<%= poquete.sha %>',\ndate: '<%= poquete.date %>'\n}\nlt.config = ",
                    footer: "\nlt.config.host = '<%= poquete.getHost() %>';\nlt.config.production = <%= poquete.isProd() %>;\n})();"
                },
                src: ['<%= poquete.app %>/config.json'],
                dest: '<%= poquete.tmp %>/config.js'
            },
            events: {
                options: {
                    banner: "(function() { \nlt.events = ",
                    footer: "})();"
                },
                src: ['<%= poquete.app %>/events.json'],
                dest: '<%= poquete.tmp %>/events.js'
            },
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
                    '<%= poquete.app %>/index.js',
                    '<%= ngmodules.components.dest %>',
                    '<%= ngmodules.services.dest %>',
                    '<%= ngmodules.utils.dest %>',
                    '<%= ngmodules.widgets.dest %>',
                    '<%= ngtemplates.app.dest %>',
                    '<%= concat.config.dest %>',
                    '<%= concat.events.dest %>'
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
                    '<%= poquete.bower %>/angular-i18n/angular-locale_en.js',
                    '<%= poquete.vendors %>/angular-bootstrap/ui-bootstrap.js',
                    '<%= poquete.vendors %>/angular-bootstrap/ui-bootstrap-tpls.js',
                    '<%= poquete.vendors %>/marker-clusterer/marker-clusterer.js',
                    '<%= poquete.app %>/plugins/*.js'
                ],
                dest: '<%= poquete.dist %>/js/vendor.js'
            },
            ie: {
                src: [
                    '<%= poquete.bower %>/es5-shim/es5-shim.js',
                    '<%= poquete.bower %>/json3/lib/json3.js',
                    '<%= poquete.app %>/ie/*.js'
                ],
                dest: '<%= poquete.dist %>/js/ie.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            app: [
                '<%= poquete.app %>/js/poquete.js',
                '<%= poquete.app %>/components/**/*.js',
                '<%= poquete.app %>/services/**/*.js',
                '<%= poquete.app %>/utils/**/*.js',
                '<%= poquete.app %>/widgets/**/*.js'
            ]
        },
        uglify: {
            app: {
                options: {
                    banner: '/*! <%= poquete.banner %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/js/poquete.min.js': ['<%= concat.app.dest %>']
                }
            },
            vendor: {
                options: {
                    banner: '/*! <%= poquete.banner %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/js/vendor.min.js': ['<%= concat.vendor.dest %>']
                }
            },
            ie: {
                options: {
                    banner: '/*! <%= poquete.banner %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/js/ie.min.js': ['<%= concat.ie.dest %>']
                }
            }
        },
        cssmin: {
            combine: {
                options: {
                    banner: '/* <%= poquete.banner %> */\n'
                },
                files: {
                    '<%= poquete.dist %>/css/poquete.min.css': [
                        '<%= poquete.vendors %>/bootstrap/css/*min.css',
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
            },
            mocks: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= poquete.app %>/mocks',
                        src: ['**'],
                        dest: '<%= poquete.dist %>/mocks/'
                    }
                ]
            }
        },
        template: {
            index: {
                options: {
                    data: {
                        host: '<%= poquete.getHost() %>'
                    }
                },
                files: {
                    '<%= poquete.dist %>/index.html': ['<%= poquete.app %>/index.html']
                }
            }
        },
        clean: {
            temp: ['<%= poquete.tmp %>'],
            dist: ['<%= poquete.dist %>']
        },
        connect: {
            server: {
                options: {
                    port: '<%= poquete.port %>',
                    base: '<%= poquete.dist %>',
                    middleware: function (connect, options) {
                        return [
                            liveReload,
                            modRewrite([
                                //'^/$ /index.html [L]',
                                '!\\.html|\\.js|\\.css|\\.json|\\.eot|\\.svg|\\.ttf|\\.woff|\\.jpg|\\.png|\\.gif$ /index.html'
                            ]),
                            mountFolder(connect, poqueteConfig.dist)
                        ];
                    }
                }
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
                tasks: ['template:index'],
                options: {
                    livereload: true
                }
            },
            configs: {
                files: [
                    '<%= poquete.app %>/i18n/*',
                    '<%= poquete.app %>/categories/*'
                ],
                tasks: ['copy:configs'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            api: {
                options: {
                    file: 'api/index.js',
                    watchedExtensions: ['js'],
                    watchedFolders: ['api']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    };

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig(gruntConfig);
    grunt.registerTask('vendor', ['concat:vendor']);
    // grunt.registerTask('vendor', ['concat:vendor', 'uglify:vendor']);
    grunt.registerTask('scripts', ['ngtemplates', 'ngmodules', 'concat:config', 'concat:events', 'concat:app', 'concat:ie', 'uglify:app', 'uglify:ie', 'clean:temp']);
    grunt.registerTask('styles', ['cssmin']);

    grunt.registerTask('default', ['clean', 'copy', 'template', 'vendor', 'scripts', 'styles']);
    grunt.registerTask('server', ['default', 'connect', 'concurrent']);
    // grunt.registerTask('server', ['template']);

};