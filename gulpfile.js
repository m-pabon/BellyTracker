var gulp = require('gulp');
var fs = require('fs');

//Require each task in /gulp
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
    require('./gulp/' + task);
});

gulp.task('dev', ['watch:css', 'watch:js', 'dev:server', 'watch:multi']);
