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
                     */
                    'static/js/webapp-libs.tmp.min.js': [
                        // libs
                        'static/js/lib/bootstrap-datepicker.js',
                        'static/js/lib/jquery.maskMoney.js',
                        'static/js/lib/spectrum.js',
                        'static/js/lib/toastr.js',

                        // i18n code
                        'static/js/locales/*.js'
                    ],

                    /*
                     * webapp-scripts.min.js
                     *
                     * Webapp source code.
                     */
                    'static/js/webapp-scripts.min.js': [
                        //webapp code
                        'static/js/app/app.js',
                        'static/js/app/directives.js',
                        'static/js/app/services.js',
                        'static/js/app/controllers/*.js'
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
                    'static/js/script.min.js': [
                        'static/js/lib/min/jquery-1.10.1.min.js',
                        'static/js/lib/min/bootstrap.min.js'
                    ],

                    /*
                     * webapp-libs.min.js
                     *
                     * Webapp dependencies.
                     */
                    'static/js/webapp-libs.min.js': [
                        'static/js/lib/min/angular-strap.min.js',
                        'static/js/lib/min/angular-ui-router.min.js',
                        'static/js/lib/min/moment.min.js',
                        'static/js/webapp-libs.tmp.min.js'
                    ],

                    /*
                     * webapp.min.js
                     *
                     * Webapp source code + dependencies.
                     */
                    'static/js/webapp.min.js': [
                        'static/js/webapp-libs.min.js',
                        'static/js/webapp-scripts.min.js'
                    ]
                }
            }
        },

        clean: {
            buildjs: ['static/js/webapp-libs.tmp.min.js']
        },

        less: {
            development: {
                options: {
                },
                files: {
                    "static/css/styles.css": [
                        "static/less/styles.less",
                        "static/less/toastr-override.less"
                    ]
                }
            }
        },

        watch: {
            files: ['static/less/*.less'],
            tasks: ['less']
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /*
     * Task: buildjs
     *
     * Builds the whole javascript used in both development and production.
     *
     * Artifacts:
     * script.min.js            : the scripts for all pages (including the webapp).
     * webapp-libs.min.js       : the libs used in the webapp. 
     * webapp-scripts.min.js    : the webapp source code.
     * webapp.min.js            : the entire webapp scripts, minus global scripts.
     */
    grunt.registerTask('buildjs', ['uglify:webapp', 'concat:webapp', 'clean:buildjs']);
};
