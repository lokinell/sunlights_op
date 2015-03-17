'use strict';

var baseDir = 'client';

module.exports = {

  //This is the list of file patterns to load into the browser during testing.
  files: [
    baseDir + '/bower_components/angular/angular.js',
    baseDir + '/bower_components/jquery/dist/jquery.min.js',
    baseDir + "/bower_components/angular-loading-bar/build/loading-bar.min.js",
    baseDir + '/bower_components/bootstrap/dist/js/bootstrap.min.js',
    baseDir + '/bower_components/angular-chosen-localytics/chosen.js',
    baseDir + '/bower_components/angular-ui-date/src/date.js',
    baseDir + '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    baseDir +'/bower_components/ng-grid/ng-grid-2.0.14.min.js',
    baseDir + '/bower_components/oclazyload/dist/ocLazyLoad.min.js',
    baseDir + '/bower_components/angular-mocks/angular-mocks.js',
    baseDir + '/bower_components/angular-ui-router/release/angular-ui-router.js',
    baseDir + '/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
    baseDir + '/scripts/**/*.js',
    baseDir + '/scripts/**/*.js',
    baseDir + '/test/unit/**/*.spec.js'
  ],

  //used framework
  frameworks: ['jasmine'],

  plugins: [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-coverage',
    'karma-html-reporter',
    'karma-mocha-reporter'
  ],

  preprocessors: {
    '**/client/src/**/*.js': 'coverage'
  },

  reporters: ['mocha', 'html', 'coverage'],

  coverageReporter: {
    type: 'html',
    dir: baseDir + '/test/unit-results/coverage',
    file: 'coverage.html'
  },

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },

  logLevel: 'info',

  urlRoot: '/__test/',

  //used browsers (overriding in some gulp task)
  browsers: ['PhantomJS']
};
