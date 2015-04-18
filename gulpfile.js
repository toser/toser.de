var gulp = require('gulp'),
    compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    fileinclude = require('gulp-file-include'),
    closureCompiler = require('gulp-closure-compiler'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename');
    
gulp.task('css-app', function(){
    
    return gulp.src('./src/sass/app.scss')
                .pipe(compass({
                    config_file: './config.rb',
                    sass: './src/sass',
                    css: './src/css',
                    image: './src/images'
                }))
                .on('error', function (error) {
                    console.log(error);
                    this.emit('end');
                })
});

gulp.task('js-plugins-combine', function(){
   
    return gulp.src('./src/js/plugins.js')
                .pipe(fileinclude())
                .pipe(rename('plugins.min.js'))
                .pipe(gulp.dest('./src/js'));
});

gulp.task('js-plugins-minify', function(){
   
    return gulp.src('./src/js/plugins.min.js')
                .pipe(closureCompiler({
                    compilerPath: 'node_modules/closure-compiler/lib/vendor/compiler.jar',
                    fileName: 'plugins.min.js',
                    compilerFlags: {
                        warning_level: 'QUIET'
                    }
                }))
                .pipe(gulp.dest('./src/js'));;
});

gulp.task('js-app-combine', function(){
   
    return gulp.src('./src/js/app.js')
                .pipe(fileinclude())
                .pipe(rename('app.min.js'))
                .pipe(gulp.dest('./src/js'));
});

gulp.task('js-app-minify', function(){
   
    return gulp.src('./src/js/app.min.js')
                .pipe(closureCompiler({
                    compilerPath: 'node_modules/closure-compiler/lib/vendor/compiler.jar',
                    fileName: 'app.min.js',
                }))
                .pipe(gulp.dest('./src/js'));;
});



gulp.task('js-plugins', function (callback) {
    runSequence(
        'js-plugins-combine',
        'js-plugins-minify',
        callback);
});

gulp.task('js-app', function (callback) {
    runSequence(
        'js-app-combine',
        'js-app-minify',
        callback);
});

gulp.task('default', ['css-app', 'js-plugins', 'js-app']);