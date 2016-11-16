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
