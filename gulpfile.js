var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var express = require('express');
var colors = require('colors');

gulp.task('default', ['livereload','express'], function() {
	gulp.watch('css/*.css', notifyLiveReload);
	gulp.watch('index.html', notifyLiveReload);
	gulp.watch('src/*.scss', ['sass']);
});

gulp.task('sass', function(){
	gulp.src('src/main.scss')
		.pipe(sourcemaps.init())
        .pipe(sass().on('error', function(err){
        	var fnl = err.file.split("/");
        	var fn = fnl[fnl.length-1];
        	console.log("ERROR: ".red + fn.yellow + "#".cyan + err.line.toString().cyan + ":".cyan + err.column.toString().cyan + " - " + err.message);
        	return true;
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'));
});

function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname + "/", event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(8082);
});

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({port: 8082}));
	app.use(express.static("./"));
	app.listen(8080);
	console.log("Web server listening on http://127.0.0.1:8080");
});