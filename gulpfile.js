var path = require("path");
var gulp = require("gulp");
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var less = require("gulp-less");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var distName = "u_member"
gulp.task('webserver', function () {
    connect.server({
        root: ['./'],
        port: 8080,
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
gulp.task("pack:js", function () {
    gulp.src("src/pages/**/*.js", { base: "src" })
        .pipe(rename(function (path) {
            // path.dirname += "/ciao";
            // path.basename += "-0.0.1";
            // path.extname = ".md";
        }))
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(distName));
    gulp.src("src/js/*.js", { base: "src" })
        .pipe(gulp.dest(distName))
});
gulp.task("pack:others", function () {
    gulp.src(["src/**/*.html", "src/**/*.css"])
        .pipe(gulp.dest(distName));
});
gulp.task("pack:all", ["pack:js", "pack:others"])




gulp.task("default", ["webserver", "watch:less"])