var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    watch       = require('gulp-watch'),
    less        = require('gulp-less'),
    connect     = require('gulp-connect'),
    minifyCss   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    useref      = require('gulp-useref'),
    minifyHTML  = require('gulp-minify-html'),
    replace     = require('gulp-replace'),
    argv        = require('yargs').argv,
    fs          = require("fs"),
    s3          = require("gulp-s3");


try {
    var awsCredentials = require((process.env.HOME || process.env.HOMEPATH) + '/.ssh/authorized.json');
    awsCredentials.S3.bucket = "asociados-client";
}catch(err) {
    var awsCredentials = {};
}

// var awsCredentials = JSON.parse(fs.readFileSync('./aws.json'));
var awsUrl = 'https://s3-us-west-2.amazonaws.com/asociados-client';
var ENV = {
    'Stage': '/stage/',
    'Prod': '/prod/',
}


gulp.task('less', function(){
    return gulp.src(['../assets/css/main.less'])
        .pipe(less())
        .pipe(gulp.dest('../assets/css/'))
        .pipe(connect.reload());
});


gulp.task('js', function () {
    return gulp.src('../assets/**/*.js')
        .pipe(connect.reload());
});


gulp.task('html', function () {
    return gulp.src(['../assets/**/*.html', '../assets/*.html'])
        .pipe(connect.reload());
});


gulp.task('watch', function(){
    gulp.watch('../assets/css/*.less', ['less']);
    gulp.watch('../assets/**/*.js', ['js']);
    gulp.watch(['../assets/**/*.html', '../assets/*.html'], ['html']);
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
    return gulp.src(['../assets/index.html'])
        .pipe(assets)
        .pipe(gulpif('*.css', minifyCss({keepSpecialComments:0})))
        //.pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('../public'));
});


gulp.task('fonts', function(){
    return gulp.src(['../assets/fonts/*'])
        .pipe(gulp.dest('../public/fonts'));
});


gulp.task('images', function(){
    return gulp.src(['../assets/img/*'])
        .pipe(gulp.dest('../public/img'));
});


gulp.task('views', function() {
    return gulp.src(['../assets/modules/**/*.html'])
        .pipe(minifyHTML({conditionals: true, spare:true, empty:true}))
        .pipe(gulp.dest('../public/modules'))
});


gulp.task('replace', ['build'], function(){
    return gulp.src('../public/index.html')
        .pipe(replace('../public/', awsUrl + ENV[argv.env]))
        .pipe(replace('../assets/', awsUrl + ENV[argv.env]))
        .pipe(replace("var ENV = 'Dev'", "var ENV = '"+ argv.env +"'"))
        .pipe(gulp.dest('../public/'));
});

gulp.task("aws", function(){
    return gulp.src('../public/**/*')
        .pipe(s3(awsCredentials.S3, {
            uploadPath: ENV[argv.env],
            headers: {
                'x-amz-acl': 'public-read'
            }
        }));
})

gulp.task('dev', ['watch', 'connect']);
gulp.task('build', ['less', 'index', 'fonts', 'images', 'views']);
gulp.task('deploy', ['replace', 'aws']);