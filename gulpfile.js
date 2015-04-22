'use strict';

var config = require('./build/build.config.js');
var karmaConfig = require('./build/karma.config.js');
var protractorConfig = require('./build/protractor.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pkg = require('./package');
var karma = require('karma').server;
var del = require('del');
var _ = require('lodash');
var replace = require('gulp-replace');
var file = require('gulp-file');
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var devBaseUrl = 'var baseUrl = "http://localhost:9001/op"';
var uatBaseUrl = 'var baseUrl =  "https://api-2.sunlights.me/api/op"';
var prdBaseUrl = 'var baseUrl =  "https://api.sunlights.me/api/op"';
var clean = require('gulp-clean');// run unit tests and watch files
//update webdriver if necessary, this task will be used by e2e task
gulp.task('webdriver:update', webdriverUpdate);
gulp.task('tdd', function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: false,
        action: 'watch',
        browsers: ['PhantomJS']
    }), cb);
});

// run unit tests with travis CI
gulp.task('travis', ['build'], function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: true,
        browsers: ['PhantomJS']
    }), cb);
});

// optimize images and put them in the dist folder
gulp.task('images', function() {
    return gulp.src(config.images)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.dist + '/assets/images'))
        .pipe($.size({
            title: 'images'
        }));
});

//generate angular templates using html2js
gulp.task('templates', function() {
    return gulp.src(config.tpl)
        .pipe($.changed(config.tmp))
        .pipe($.html2js({
            outputModuleName: 'templates',
            base: 'client',
            useStrict: true
        }))
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest(config.tmp))
        .pipe($.size({
            title: 'templates'
        }));
});



//build files for creating a dist release
gulp.task('build:dist', ['clean'], function(cb) {
    runSequence(['build', 'copy','fonts', 'copy:assets', 'images'], 'html', cb);
});

//build files for development
gulp.task('build', ['clean'], function(cb) {
    runSequence(['templates'], cb);
});

//generate a minified css files, 2 js file, change theirs name to be unique, and generate sourcemaps
gulp.task('html', function() {
    var assets = $.useref.assets({
        searchPath: '{build,client}'
    });

    return gulp.src(config.index)
        .pipe(assets)
        .pipe($.sourcemaps.init())
        .pipe($.if('**/*main.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify({
            mangle: false
        })))
        .pipe($.if('*.css', $.csso()))
        .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {
            pkg: pkg
        })))
        .pipe($.rev())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe($.if('*.html', $.minifyHtml({
            empty: true
        })))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.dist))
        .pipe($.size({
            title: 'html'
        }));
});

//copy assets in dist folder
gulp.task('copy:assets', function() {
    return gulp.src(config.assets, {
            dot: true
        })
        .pipe(gulp.dest(config.dist + '/assets'))
        .pipe($.size({
            title: 'copy:assets'
        }));
});

//copy assets in dist folder
gulp.task('copy', function() {
    return gulp.src([
            config.base + '/**',
            '!' + config.base + '/bower_components/**',
            config.base + '/*.*',
            config.base + '/assets',
            config.base + '/scripts',
            config.base + '/views',
            '!' + config.base + '/*.html',
            '!' + config.base + '/test/**'
        ]).pipe(gulp.dest(config.dist))
        .pipe($.size({
            title: 'copy'
        }));
});

//clean temporary directories
gulp.task('clean', del.bind(null, [config.dist, config.tmp]));

//lint files
gulp.task('jshint', function() {
    return gulp.src(config.js)
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

/* tasks supposed to be public */


//default task
gulp.task('default', ['serve']); //

//run unit tests and exit
gulp.task('test:unit', ['build'], function(cb) {
    karma.start(_.assign({}, karmaConfig, {
        singleRun: true
    }), cb);
});

// Run e2e tests using protractor, make sure serve task is running.
gulp.task('test:e2e', ['webdriver:update'], function() {
    return gulp.src(protractorConfig.config.specs)
        .pipe($.protractor.protractor({
            configFile: 'build/protractor.config.js'
        }))
        .on('error', function(e) {
            console.error(e);
        });
});

//run the server,  watch for file changes and redo tests.
gulp.task('serve:tdd', function(cb) {
    runSequence(['serve', 'tdd'], cb);
});

//run the server after having built generated files, and watch for changes
gulp.task('watchFile', ['build'], function() {
    browserSync({
        notify: false,
        logPrefix: pkg.name,
        server: ['build', 'client']
    });

    gulp.watch(config.html, reload);
    gulp.watch(config.tpl, ['templates', reload]);
    gulp.watch(config.assets, reload);
});



gulp.task('serve', function(cb) {
  runSequence('create-config-dev','watchFile');
});

//run the app packed in the dist folder
gulp.task('serve:dist', ['build:dist'], function() {
    browserSync({
        notify: false,
        server: [config.dist]
    });
});

gulp.task('fonts', ['clean'], function() {
  return gulp.src([config.base +'/bower_components/bootstrap/fonts/*',
                   config.base +'/bower_components/font-awesome/fonts/*'])
         .pipe(gulp.dest(config.dist+'/assets/fonts/'));
});


gulp.task('uat-replace', function(){
  gulp.src(config.base+'/scripts/config.js')
    .pipe(replace(devBaseUrl, uatBaseUrl))
    .pipe(gulp.dest(config.base+'/scripts'));
});

gulp.task('dev-replace', function(){
  gulp.src(config.base+'/scripts/config.js')
    .pipe(replace('/**', devBaseUrl))
    .pipe(gulp.dest(config.base+'/scripts'));
});

gulp.task('uat-replace-env', function(){
    gulp.src(config.base+'/scripts/directives/header/header.html')
        .pipe(replace("dev", "uat"))
        .pipe(gulp.dest(config.base+'/scripts/directives/header'));
});

gulp.task('dev-replace-env', function(){
    gulp.src(config.base+'/scripts/directives/header/header.html')
        .pipe(replace("uat", "dev"))
        .pipe(gulp.dest(config.base+'/scripts/directives/header'));
});

gulp.task('uat:dist', function(){
  runSequence('create-config-uat','uat-replace-env','build:dist');
});

gulp.task('dev:dist', function(){
  runSequence('create-config-dev','dev-replace-env','build:dist');
});

gulp.task('prd:dist', function(){
  runSequence('create-config-prd','dev-replace-env','build:dist');
});

gulp.task('create-config-uat', function() {
    return file(config.base+'/scripts/config.js', uatBaseUrl, { src: true }).pipe(gulp.dest(""));
});


gulp.task('create-config-dev', function() {
  return file(config.base+'/scripts/config.js', devBaseUrl, { src: true }).pipe(gulp.dest(""));
});


gulp.task('create-config-prd', function() {
  return file(config.base+'/scripts/config.js', prdBaseUrl, { src: true }).pipe(gulp.dest(""));
});
