var gulp     = require('gulp');
var sass     = require('gulp-sass');
var glob     = require('gulp-sass-glob');
var cache    = require('gulp-angular-templatecache');
var concat   = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var merge    = require('merge-stream');

gulp.task('scripts', function() {
    var templateStream = gulp.src('./src/components/**/*.html')
        .pipe(cache({standalone: true}));

    var angularStream = gulp.src('./src/**.*.js')
        .pipe(annotate({remove: true, add: true, single_quotes: false}));

    return merge(templateStream, angularStream)
        .pipe(concat('md-editable.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', function() {
    gulp.src('./src/app.scss')
        .pipe(glob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
})

gulp.task('default',function() {
    gulp.start('scripts');
});

gulp.task('watch', function() {
    gulp.watch('gulpfile.js', ['default']);
    gulp.watch('./src/**/*.js', ['scripts']);
    gulp.watch('./src/**/*.html', ['scripts']);
});
