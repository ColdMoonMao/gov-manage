var gulp = require('gulp');
// var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
// 合并controllers
gulp.task('concat-controllers', function() {
    return gulp.src(['js/controllers/base.js', 'js/controllers/*.js'])
        .pipe(concat('controllers.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

// 合并services
gulp.task('concat-services', function() {
    return gulp.src(['js/services/base.js', 'js/services/*.js'])
        .pipe(concat('services.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js/'));
});

// 浏览器重载 合并controller和services
gulp.task('js-watch', ['concat-controllers', 'concat-services'], browserSync.reload);

//watch
gulp.task('watch', ['concat-controllers', 'concat-services'], function() {
    // 从这个项目的根目录启动服务器
    browserSync.init({
	    	server: "./"
	});
    //监控js文件,变化后执行合并任务,合并完成刷新浏览器
    var watcher = gulp.watch(['js/controllers/*.js', 'js/services/*.js' ], ['js-watch']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    //监控css文件,有变化刷新浏览器.
    gulp.watch('css/*.css',browserSync.reload).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    //监控html文件,有变化刷新浏览器.
    gulp.watch(['templates/*.html', 'index.html'],browserSync.reload).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
