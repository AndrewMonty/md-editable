var gulp     = require('gulp');
var sass     = require('gulp-sass');
var glob     = require('gulp-sass-glob');
var cache    = require('gulp-angular-templatecache');
var concat   = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var merge    = require('merge-stream');

gulp.task('scripts', function() {
    var templateStream = gulp.src('./src/components/**/*.html')
        .pipe(cache({ module: 'md.editable' }));

    var angularStream = gulp.src('./src/**/*.js')
        .pipe(annotate({ remove: true, add: true, single_quotes: false }));

    return merge(angularStream, templateStream)
        .pipe(concat('md-editable.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
    gulp.src('./src/app.scss')
        .pipe(glob())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('md-editable.css'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('default',function() {
    gulp.start('scripts', 'styles');
});

gulp.task('watch', function() {
    gulp.watch('gulpfile.js', ['default']);
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.html', ['scripts']);
    gulp.watch('./src/**/*.scss', ['styles']);
});
