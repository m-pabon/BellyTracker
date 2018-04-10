var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

//Build Diary Assets
gulp.task('diary-js', function () {
    gulp.src(['ng/module.js', 'ng/diary/**/*.js', 'ng/routes.js', 'ng/**/*.js', 'ng/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});

/*
//Build LandingPage Assets
gulp.task('landing-js', function () {
    gulp.src(['src/js/landingPage.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('landing.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});
*/

gulp.task('watch:js', ['diary-js'], function () {
    gulp.watch(['ng/**/*,js', 'ng/module.js', 'ng/routes.js', 'ng/**/*.js', 'ng/*.js'], ['diary-js']);
});
