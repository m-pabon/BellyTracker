var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');

gulp.task('css', function () {
    gulp.src('css/**/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('css/**/*.styl', ['css']);
});
