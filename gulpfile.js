// Fix browserSync
// Fix Watch / Restart

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
    browserSync = require('browser-sync');
    reload = browserSync.reload;
var mongoose = require('mongoose');
var db = require('./server/config/env/development.js').db;
var User = require('./server/models/user.js');

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
		proxy: "http://localhost:8081",
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

//TODO: allow cleaning any model
gulp.task('clean', function() {
  mongoose.connect(db);
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));
  conn.once('open', function() {
    conn.collection('reminders').drop(function (err) {
      console.log('Reminders dropped.');
    });
    /*conn.collection('users').drop(function(err) {
      console.log('Users dropped');
      var colin = new User({
        firstName: 'Colin',
        lastName: 'Hryniowski',
        bio: 'I\'m a Coach',
        username: 'colinhryniowski@gmail.com',
        password: 'letmein',
        slack_id: 'colin',
        slack: {
          email: 'colinhryniowski@gmail.com',
          id: 'colin',
          img: 'ashley.png',
          name: 'Colin Hryniowski',
          real_name: 'Colin Hryniowski'
        },
        imageUrl: 'ashley.png',
        role: 'coach',
        provider: 'local',
        phoneNumber: '+12898062194'
      });
      colin.save(function (err) {
        if (err) {
          console.log('DB is now broken, good luck.');
        }
      })
    });*/
  });
});
gulp.task("heroku:production", function(){
    console.log('hello'); // the task does not need to do anything.
});

gulp.task('default', ['browser-sync']);
