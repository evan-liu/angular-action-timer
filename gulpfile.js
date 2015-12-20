var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function () {
  gulp.src('angular-action-timer.js')
    .pipe(uglify())
    .pipe(rename('angular-action-timer.min.js'))
    .pipe(gulp.dest('./'));
});