var gulp = require('gulp');

//plugins
var sass = require('gulp-sass'),
  tinylr = require('tiny-lr'),
  csso = require('gulp-csso'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  server = tinylr();

gulp.task('sass', function() {
  return gulp.src('dev/scss/*.scss')
    .pipe(
    sass( {
      includePaths: ['scss'],
      errLogToConsole: true
    } ) )
    .pipe( csso() )
    .pipe( gulp.dest('dist/css/'))
    .pipe( livereload( server ));
});

gulp.task('assets', function () {
  return gulp.src('dev/public/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  gulp.src(['dev/js/**/*'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Rerun tasks when a file changes
gulp.task('watch', function () {

  server.listen(44443, function (err) {

    if (err) return console.log(err);

    gulp.watch('dev/public/**/*', ['assets']);
    gulp.watch('dev/scss/**/*.scss', ['sass']);
    gulp.watch('dev/js/**/*.js', ['compress']);


  });
});


// The default task (called when you run 'gulp' from cli)
// "sass" compiles the sass to css
// "watch" looks for filechanges, and runs tasks accordingly
gulp.task('default', ['sass', 'compress', 'assets', 'watch']);