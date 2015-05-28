var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    watch       = require('gulp-watch'),
    less        = require('gulp-less');
    minifyCss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    livereload  = require('gulp-livereload'),
    useref      = require('gulp-useref'),
    minifyHTML  = require('gulp-minify-html'),
    htmlreplace = require('gulp-html-replace');

livereload({ start: true });

/**
 * Common functions
 *
 */
function reload(file){
    livereload.reload(file.path);
}

gulp.task('less', function(){
    gulp.src(['../assets/css/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('../assets/css/'))
        .pipe(livereload());
});


/**
 * Develop functions
 * 
 */
gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('../assets/css/less/*.less', ['less']);
    gulp.watch('../assets/js/**/*.js').on('change', reload);
    gulp.watch('../assets/**/*.html').on('change', reload);
});



/**
 * Production functions
 * 
 */
gulp.task('clean', function () {
    del(['./../public/**/*'], {force:true});
});


gulp.task('index', function(){

    var assets = useref.assets();

    gulp.src(['../assets/index.html'])
        .pipe(assets)
        .pipe(gulpif('*.css', minifyCss()))
        // .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('../public'));
});


gulp.task('html', function() {
    var opts = {
        conditionals: true,
        spare:true
    };
 
    gulp.src(['../assets/modules/**/*.html'])
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('../public/modules'))
        .pipe(livereload());
});


gulp.task('dev', ['less', 'watch']);
gulp.task('prod', ['less', 'index', 'html']);