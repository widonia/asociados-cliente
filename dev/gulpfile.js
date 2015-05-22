var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var minifyHTML = require('gulp-minify-html');
var less = require('gulp-less');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');





gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('panel/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('../public'))
    .pipe(livereload());
});


//less//
gulp.task('less', function () {
gulp.src('panel/stylesheets/*.less')
  .pipe(less())
  .pipe(minifyCss())
  .pipe(gulp.dest('panel/stylesheets'))
  .pipe(livereload());
  });


//CSS//
gulp.task('minify-css', function() {
    gulp.src('panel/stylesheets/*.css')
    .pipe(concat('all.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('../public/stylesheets'));
});




//css global librerias//
gulp.task('lib-css', function() {
  gulp.src('panel/lib/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('../public/lib'))
    .pipe(livereload());
});


//css global librerias//
gulp.task('modules-css', function() {
  gulp.src('panel/modules/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('../public/modules'))
    .pipe(livereload());
});




//javascript //

gulp.task('scripts', function() {
  gulp.src('panel/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('../public/js'))
    .pipe(livereload());

});



// gulp.task('modules-js', function() {
//   gulp.src('panel/modules/**/*.js')
   
//     .pipe(uglify())
//     .pipe(gulp.dest('../public/modules'))
//     .pipe(livereload());

// });



//javascript global librerias//

gulp.task('lib', function() {
  gulp.src('panel/lib/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('../public/lib'))
    .pipe(livereload());

});



gulp.task('default', ['minify-html', 'lib', 'scripts', 'modules-css', 'modules-js', 'less', 'minify-css', 'watch']);

gulp.task('watch', function() {
    gulp.watch('panel/modules/**/*.html', ['minify-html']);
    gulp.watch('panel/lib/**/*.js', ['lib']);
    gulp.watch('panel/js/*.js', ['scripts']);
    gulp.watch('panel/modules/**/*.css', ['modules-css']);
    // gulp.watch('panel/modules/**/*.js', ['modules-js']);
    gulp.watch('panel/stylesheets/*.less', ['less']);
    gulp.watch('panel/stylesheets/*.css', ['minify-css']);
});





