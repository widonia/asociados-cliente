var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    watch       = require('gulp-watch'),
    less        = require('gulp-less'),
    connect     = require('gulp-connect'),
    minifyCss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    useref      = require('gulp-useref'),
    minifyHTML  = require('gulp-minify-html');


gulp.task('less', function(){
    gulp.src(['../assets/css/main.less'])
        .pipe(less())
        .pipe(gulp.dest('../assets/css/'))
        .pipe(connect.reload());
});


gulp.task('watch', function(){
    gulp.watch('../assets/css/*.less', ['less']);
});


gulp.task('connect', function() {
    connect.server({
        port: 4000,
        root: '../assets/',
        livereload: true
    });
});


gulp.task('index', function(){
    var assets = useref.assets();
    gulp.src(['../assets/index.html'])
        .pipe(assets)
        .pipe(gulpif('*.css', minifyCss({keepSpecialComments:0})))
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('../public'));
});


gulp.task('fonts', function(){
    gulp.src(['../assets/fonts/*'])
        .pipe(gulp.dest('../public/fonts'));
});


gulp.task('images', function(){
    gulp.src(['../assets/img/*'])
        .pipe(gulp.dest('../public/img'));
});


gulp.task('views', function() {
    gulp.src(['../assets/modules/**/*.html'])
        .pipe(minifyHTML({conditionals: true, spare:true}))
        .pipe(gulp.dest('../public/modules'))
});


gulp.task('dev', ['watch', 'connect']);
gulp.task('prod', ['less', 'index', 'fonts', 'images', 'views']);
