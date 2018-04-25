var gulp = require('gulp');

gulp.task('multi', function () {
    gulp.src(['src/background.jpg', 'src/nutritionix.png'])
        .pipe(gulp.dest('assets'));
});

gulp.task('watch:multi', ['multi'], function () {
    gulp.watch(['src/background.jpg', 'src/nutritionix.png'], ['multi']);
});
