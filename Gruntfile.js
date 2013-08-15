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
                    'static/js/webapp-script.js': [
                        // libs
                        'static/js/lib/bootstrap-datepicker.js',
                        'static/js/lib/jquery.maskMoney.js',
                        'static/js/lib/spectrum.js',

                        // i18n code
                        'static/js/locales/*.js',

                        //webapp code
                        'static/js/app.js',
                        'static/js/directives.js',
                        'static/js/services.js',
                        'static/js/controllers/*.js'
                    ]
                }
            }
        },

        concat: {
            base: {
                src: [
                    'static/js/lib/min/jquery-1.10.1.min.js',
                    'static/js/lib/min/bootstrap.min.js'
                ],
                dest: 'static/js/script.js',
            },
            webapp: {
                src: [
                    'static/js/lib/min/angular-strap.min.js',
                    'static/js/lib/min/angular-ui-router.min.js',
                    'static/js/lib/min/moment.min.js',
                    'static/js/webapp-script.js'
                ],
                dest: 'static/js/webapp.js',
            }
        },

        clean: {
            buildjs: ['static/js/webapp-script.js']
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    /*
     * Task: buildjs
     *
     * Concatenatess the base scripts (for bases outside the webapp) into script.js.
     * Minifies all webapp code and dependencies into webapp-script.js.
     * Concatenates the webapp code with the already minified dependencies into webapp.js.
     *
     * Artifacts:
     * script.js - the scripts for all pages (including the webapp);
     * webapp.js - scripts for the webapp.
     */
    grunt.registerTask('buildjs', ['concat:base', 'uglify:webapp', 'concat:webapp', 'clean:buildjs']);
};
