var gulp=require('gulp');
var uglify=require('gulp-uglify');
gulp.task('uglify',function(){
    gulp.src('*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
var minify=require('gulp-minify');
gulp.task('minify',function(){
    gulp.src('*.js')
    .pipe(minify())
    .pipe(gulp.dest('distm'))
});
var concat = require('gulp-concat');
 
gulp.task('concat', function() {
  return gulp.src('*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('distc'));
});
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});
gulp.task('default', ['serve']);