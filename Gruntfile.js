module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            webapp: {
                files: {
                    /*
                     * webapp-libs.tmp.min.js
                     *
                     * Libs used by the webapp.
                     * This file is temporary.
                     */
                    'static/dist/js/webapp-libs.min.tmp.js': [
                        // libs
                        'static/src/js/lib/bootstrap-datepicker.js',
                        'static/src/js/lib/jquery.maskMoney.js',

                        // i18n code
                        'static/src/js/locales/*.js'
                    ],

                    /*
                     * webapp-scripts.min.js
                     *
                     * Webapp source code.
                     * This file is temporary.
                     */
                    'static/dist/js/webapp-scripts.min.tmp.js': [
                        'static/src/js/app/app.js',
                        'static/src/js/app/directives.js',
                        'static/src/js/app/services.js',
                        'static/src/js/app/controllers/*',
                        'static/src/js/app/modules/*'
                    ]
                }
            }
        },

        concat: {
            webapp: {
                files: {

                    /*
                     * script.min.js
                     *
                     * Base scripts used in the entire site.
                     */
                    'static/dist/js/script.min.js': [
                        'static/src/js/lib/min/jquery-1.10.2.min.js',
                        'static/src/js/lib/min/bootstrap.min.js'
                    ],

                    /*
                     * webapp-libs.min.js
                     *
                     * Webapp dependencies.
                     * This file is temporary.
                     */
                    'static/dist/js/webapp-libs.min.tmp.js': [
                        'static/src/js/lib/min/angular-strap.min.js',
                        'static/src/js/lib/min/angular-ui-router.min.js',
                        'static/src/js/lib/min/moment.min.js',
                        'static/src/js/lib/min/toastr.min.js',
                        'static/src/js/lib/min/highcharts.js',
                        'static/src/js/lib/min/bootstrap-select.min.js',
                        'static/src/js/lib/min/modernizr.custom.19405.js',

                        'static/dist/js/webapp-libs.min.tmp.js'
                    ],

                    /*
                     * webapp.min.js
                     *
                     * Webapp source code + dependencies.
                     */
                    'static/dist/js/webapp.min.js': [
                        'static/dist/js/webapp-libs.min.tmp.js',
                        'static/dist/js/webapp-scripts.min.tmp.js'
                    ]
                }
            }
        },

        clean: {
            dist: ['static/dist/*'],
            buildjs: [
                'static/dist/js/webapp-libs.min.tmp.js',
                'static/dist/js/webapp-scripts.min.tmp.js'
            ],
            local_settings: ['core/local_settings.py', 'core/local_settings.pyc']
        },

        less: {
            webapp: {
                files: {
                    "static/src/css/styles.css": [
                        "static/less/webapp/*.less",
                        "static/less/variables.less"
                    ]
                }
            },
            landing: {
                files: {
                    "static/src/css/landing.css": [
                        "static/less/landing/*.less",
                        "static/less/variables.less"
                    ]
                }
            }

        },

        watch: {
            webapp: {
                files: ['static/less/*.less', 'static/less/webapp/*.less'],
                tasks: ['less:webapp']
            },
            landing: {
                files: ['static/less/*.less', 'static/less/landing/*.less'],
                tasks: ['less:landing']
            }
        },

        exec: {
            makemessagesDjango: {
                command: 'python manage.py makemessages -l pt_BR -i node_modules -i staticfiles -i static/dist'
            },
            makemessagesJS: {
                command: 'python manage.py makemessages -l pt_BR -d djangojs -i node_modules -i staticfiles -i static/dist'
            },
            testserver: {
                cmd: function runTestServer () {
                    var command = 'python manage.py testserver --addrport 0:{{port}} testserver_data.yaml';
                    var port = this.option('port') || 8001;

                    return command.replace('{{port}}', port);
                }
            },
            foreman: {
                command: 'python manage.py collectstatic --noinput; foreman start --port 8001'
            }
        },

        copy: {
            webapp: {
                files: [
                    {src: 'img/**', dest: 'static/dist/', expand: true, cwd: 'static/src'},
                    {src: 'css/**', dest: 'static/dist/', expand: true, cwd: 'static/src'},
                    {src: 'font/**', dest: 'static/dist/', expand: true, cwd: 'static/src'}
                ]
            },
            local_settings: {
                files: [
                    {src: 'core/dev_settings/<%= grunt.option("file") || "dev" %>.py', dest: 'core/local_settings.py'}
                ]
            }
        },

        jshint: {
            options: {
               '-W065': true,
                globals: {
                    gettext: false,
                    toastr: false,
                    angular: false,
                    $: false,
                    Highcharts: false,
                    moment: false
                }
            },
            all: ['static/src/js/app/**/*.js']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    /*
     * Task: buildjs
     *
     * Artifacts:
     * script.min.js            : the scripts for all pages (including the webapp).
     * webapp.min.js            : the entire webapp scripts, except global scripts.
     */
    grunt.registerTask('build-webapp', 'Builds the whole javascript used in production.', ['clean:dist', 'uglify:webapp', 'concat:webapp', 'clean:buildjs', 'copy:webapp']);

    grunt.registerTask('makemessages', 'Make message files for both django and djangojs.', ['exec:makemessagesDjango', 'exec:makemessagesJS']);

    grunt.registerTask('testserver', 'Runs the django testserver on port 8002 and loading the `testserver_data.yaml` fixture.', ['exec:testserver']);

    grunt.registerTask('foreman', 'Colect static files and runs foreman on port 8001.', ['exec:foreman']);

    grunt.registerTask('patch-settings', 'Patches the local settings file with a file in the `core/dev_settings` folder.', ['clean:local_settings', 'copy:local_settings']);
};
