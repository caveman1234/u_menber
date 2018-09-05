var path = require("path");
var gulp = require("gulp");
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var less = require("gulp-less");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("gulp-autoprefixer");
var proxyArr = require("./proxyConfig");
var distName = "KH";
var jq = require("dr9527");
console.log("jq::",jq)
gulp.task('webserver', function () {
    connect.server({
        root: ['./'],
        port: 8888,
        livereload: true,
        middleware: function (connect, opt) {
            return proxyArr
        }
    });
});
gulp.task("watch:less", function () {
    gulp.watch("src/**/*.less", function (obj) {
        var lessPath = obj.path;
        gulp.src(lessPath)
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest(path.resolve(lessPath, "..")));
    });
});
gulp.task("pack:js", function () {
    gulp.src([
        "src/pages/**/*.js",
    ], { base: "src" })
        .pipe(rename(function (path) {
            // path.dirname += "/ciao";
            // path.basename += "-0.0.1";
            // path.extname = ".md";
        }))
        .pipe(babel({
            presets: ['env'],
            plugins: ["transform-remove-strict-mode"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(distName));
    gulp.src(
        [
            "src/js/*.js",
        ], { base: "src" })
        .pipe(gulp.dest(distName))
});
gulp.task("pack:others", function () {
    gulp.src([
        // "src/**/*.html", 
        // "src/**/*.css",
        "src/css/**/**",
        "src/pages/**",
        "!src/pages/**/*.js",
        "!src/pages/**/*.less"
    ], { base: "src" })
        .pipe(gulp.dest(distName));
});
gulp.task("pack", ["pack:js", "pack:others"])




gulp.task("default", ["webserver", "watch:less"])