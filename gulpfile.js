// Fix browserSync
// Fix Watch / Restart

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
    browserSync = require('browser-sync');
    reload = browserSync.reload;

var paths = {
  angular: ['app/dist/**/*.js'],
  css: ['app/assets/styles/css/**/*.css'],
  sass: ['app/**/*.scss'],
  views: ['app/dist/views/*.html'],
  server: ['server/**/*.js']
}


gulp.task('sass', function () {
  return gulp.src('app/dist/triangular/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/dist/triangular/assets/css'));
});

gulp.task('nodemon' ,['sass'], function (cb) {
	var started = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
    injectChanges: true,
		proxy: "http://localhost:3000",
        files: ["app/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('watch', function() {
  gulp.watch(paths.angular, reload);
  gulp.watch(paths.server, reload);
  //gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css, reload);
});

gulp.task('default', ['browser-sync']);
