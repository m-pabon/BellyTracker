var gulp = require('gulp');

gulp.task('multi', function () {
    gulp.src(['src/background.jpg'])
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:multi', ['multi'], function () {
    gulp.watch('src/background.jpg', ['multi']);
});
