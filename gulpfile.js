var path = require("path");
var gulp = require("gulp");
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var less = require("gulp-less");
var babel = require("gulp-babel");

gulp.task('webserver', function () {
    connect.server({
        root: ['./'],
        port: 8000,
        livereload: true,
        middleware: function (connect, opt) {
            return [
                proxy('/ocm-web', {
                    target: 'http://182.150.55.64:8013/',
                    changeOrigin: true
                })
            ]
        }
    });
});
gulp.task("watch:less", function () {
    gulp.watch("src/**/*.less", function (obj) {
        var lessPath = obj.path;
        gulp.src(lessPath)
            .pipe(less())
            .pipe(gulp.dest(path.resolve(lessPath, "..")));
    });
});
gulp.task("es2015",function(){
    gulp.src("src/pages/test.js")
        .pipe(babel({
            presets:["env"],
            plugins:["transform-runtime"]
        }))
        .pipe(gulp.dest("src"))
});




gulp.task("default", ["webserver", "watch:less", "watch:js"])