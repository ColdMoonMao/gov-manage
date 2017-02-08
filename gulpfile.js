var gulp = require('gulp');
// var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// 合并controllers
gulp.task('concat-controllers', function() {
    gulp.src(['js/controllers/base.js', 'js/controllers/*.js'])
        .pipe(concat('controllers.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

// 合并services
gulp.task('concat-services', function() {
    gulp.src(['js/services/base.js', 'js/services/*.js'])
        .pipe(concat('services.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

//合并controller和services
gulp.task('scripts', ['concat-controllers', 'concat-services'], function() {
    console.log('执行完毕');
});

//watch
gulp.task('watch',['scripts'], function() {
    var watcher = gulp.watch(['js/controllers/*.js', 'js/services/*.js'], ['concat-controllers', 'concat-services']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
