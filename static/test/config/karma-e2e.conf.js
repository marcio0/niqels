module.exports = function(config){
    config.set({
        hostname: '0',
        port: 8001,

        basePath : '../',

        files : [
            'e2e/**/*.js',
            'lib/angular-scenario-waitFor.js'
        ],

        autoWatch : false,

        browsers : ['Chrome'],

        frameworks: ['ng-scenario'],

        singleRun : false,

        proxies : {
            '/': 'http://localhost:8000/'
        },

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-scenario'    
        ],

        junitReporter : {
            outputFile: 'test_out/e2e.xml',
            suite: 'e2e'
        }
})}

