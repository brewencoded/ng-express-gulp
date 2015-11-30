/*jshint node: true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    minify = require('gulp-minify-css');

//var test = require('./gulp-test.js');

//////////////////////////////////////////////
// Run Tests
//////////////////////////////////////////////
gulp.task('test', function () {

});

//////////////////////////////////////////////
// Sass
//////////////////////////////////////////////
gulp.task('sass', function () {
    return gulp.src(['src/client/public/scss/base.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minify())
        .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build/client/public/css'))
        .pipe(browserSync.stream());
});

//////////////////////////////////////////////
// JS
//////////////////////////////////////////////
gulp.task('dev-js', ['bower-js'], function () {
    return gulp.src([
        'src/client/public/js/*.js',
        'src/client/public/js/controllers/*.js',
        'src/client/public/js/directives/*.js',
        'src/client/public/js/services/*.js'
    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('build/client/public/js'));
});

gulp.task('bower-js', ['bower-js-maps'], function () {
    return gulp.src([
        'src/client/bower/angular/angular.min.js',
        'src/client/bower/angular-ui-router/release/angular-ui-router.min.js'
    ])
        .pipe(plumber())
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('build/client/public/js'));
});

gulp.task('bower-js-maps', function () {
	return gulp.src([
			'src/client/bower/angular/angular.min.js.map'
		])
		.pipe(gulp.dest('build/client/public/js'));
});

//////////////////////////////////////////////
// Fonts and Images
//////////////////////////////////////////////
gulp.task('images', function () {
    return gulp.src([
        'src/client/public/images/*'
    ])
    	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/client/public/images'))
        .pipe(browserSync.stream());
});

//////////////////////////////////////////////
// Server Files
//////////////////////////////////////////////
gulp.task('server-files', function () {
    return gulp.src([
        'src/index.js',
        'src/server/**/*',
        'src/bin/**/*'
    ], {
            base: './src'
        })
        .pipe(plumber())
        .pipe(gulp.dest('build'));
});

//////////////////////////////////////////////
// Move templates
//////////////////////////////////////////////
gulp.task('templates', function () {
    return gulp.src('src/client/public/templates/**/*', {
            base: 'src/client/public'
        })
        .pipe(plumber())
        .pipe(gulp.dest('build/client/public'));
});

//////////////////////////////////////////////
// Move index
//////////////////////////////////////////////
gulp.task('index', function () {
    return gulp.src('src/client/public/index.html')
        .pipe(plumber())
        .pipe(gulp.dest('build/client/public'));
});

//////////////////////////////////////////////
// Dev Server
//////////////////////////////////////////////
gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 8087
    });

    gulp.watch('src/client/public/js/**/*.js', ['dev-js']).on('change', browserSync.reload);
    gulp.watch('src/client/public/scss/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('src/client/public/templates/**/*.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('src/client/public/index.html', ['index']).on('change', browserSync.reload);
    gulp.watch('src/client/public/images/*', ['images']).on('change', browserSync.reload);
});

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
            // nodemon our expressjs server
            script: 'build/bin/www',
            watch: ['src/index.js']
        })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, 1000);
        });
});

//////////////////////////////////////////////
// Builds
//////////////////////////////////////////////
gulp.task('default', ['dist'], function () {
    gulp.start('browser-sync');
});
gulp.task('dist', ['server-files', 'sass', 'dev-js', 'images', 'templates', 'index']);