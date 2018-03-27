var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

//Build Diary Assets
gulp.task('diary-js', function () {
    gulp.src(['ng/module.js', 'ng/diary/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('diary.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});

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

gulp.task('watch:js', ['diary-js', 'landing-js'], function () {
    gulp.watch(['ng/**/*,js', 'src/js/landingPage.js'], ['diary-js', 'landing-js']);
});
