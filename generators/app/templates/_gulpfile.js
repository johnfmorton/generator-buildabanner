// DoubleClick HTML polite banner
// <%= creativeName %>
//
// dependencies
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');
var rename = require('gulp-rename');
var del = require('del');
var connect = require('gulp-connect');
var open = require('gulp-open');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

// tasks
//
// Uglify external JS files
gulp.task('uglify:dist', function() {
    var opt = {
      mangle: true, // make shorter variable names
      compress: {
        drop_debugger: true, // drop debugger messages from code
        drop_console: true // drop console messages from code
        },
      output: {
        beautify: false // make code pretty? default is false
      }
    };
    return gulp.src('dev/script.js')
        .pipe(uglify(opt))
        .pipe(rename('script.js'))
        .pipe(gulp.dest('dist/'));
});

// Uglify / Minify inline JS and CSS
gulp.task('minify-inline', function() {
    var opt = {
        js : { // options for inline JS
          mangle: true, // make shorter variable names
          compress: {
            drop_debugger: true, // drop debugger messages from code
            drop_console: true // drop console messages from code
            },
          output: {
            beautify: false // make code pretty? default is false
          }
      }
    };
    gulp.src('dist/*.html')
        .pipe(minifyInline(opt))
        .pipe(gulp.dest('dist/'))
});

gulp.task('sass:dev', function() {
    return gulp.src('dev/style.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dev'))
        .pipe(connect.reload());;
});

gulp.task('sass:dist', function() {
    return gulp.src('dev/style.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function() {
    var opts = {
        conditionals: true,
        spare: false
    };

    return gulp.src('dist/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('del', function() {
    del([
        'dist/*'
    ])
});

gulp.task('connect', function() {
    connect.server({
        root: ['dev'],
        port: 8889,
        livereload: true,
        //livereload: { port: '9999' }
    });
});

gulp.task('open', function() {
    console.log("-----------------------------------------");
    console.log("Opening browser to: http://localhost:8889");
    console.log("-----------------------------------------");
    var options = {
        uri: 'http://localhost:8889',
        app: 'Google Chrome'
            //app: 'firefox'
    };
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task('copy-to-dist-folder', function() {
    return gulp.src(['dev/index.html', 'dev/style.css', 'dev/*.png', 'dev/*.jpg', 'dev/*.gif', 'dev/script.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
    return gulp.src('dist/*')
        .pipe(zip('<%= archiveName %>'))
        .pipe(gulp.dest('delivery'));
});

gulp.task('basic-reload', function() {
    console.log('basic-reload task');
    gulp.src('dev')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['dev/*.html', 'dev/*.js'], ['basic-reload']);
    gulp.watch(['dev/*.scss'], ['sass:dev']);
});

gulp.task('default', ['sass:dev', 'connect', 'open', 'watch']);

gulp.task('build', function(callback) {
    runSequence('del', 'copy-to-dist-folder', ['minify-html'], ['minify-inline', 'sass:dist'], 'uglify:dist', ['compress'],
        callback);
});

gulp.task('finalize', ['compress']);
