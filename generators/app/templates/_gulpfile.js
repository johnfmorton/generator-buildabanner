// DoubleClick HTML polite banner
// <%= creativeName %>
//
// dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
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
var header = require('gulp-header');

// read in the package file
var pkg = require('./package.json');

// Banner message to be appended to minified files
var nowDate = new Date();

var bannerMessageHtml = ['<!--',
    ' <%= openTag %> pkg.name %> - <%= openTag %> pkg.description %>',
    ' @version v<%= openTag %> pkg.version %>',
    ' @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
    ' -->',
    ''
].join('\n');
var bannerMessageJsCss = ['/**',
    ' * <%= openTag %> pkg.name %> - <%= openTag %> pkg.description %>',
    ' * @version v<%= openTag %> pkg.version %>',
    ' * @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
    ' */',
    ''
].join('\n');


// TASKS

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
        .pipe(header(bannerMessageJsCss, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/'));
});

// Uglify / Minify inline JS and CSS
gulp.task('minify-inline', function() {
    var opt = {
        js: { // options for inline JS
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
        .pipe(header(bannerMessageJsCss, {
            pkg: pkg
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
        .pipe(header(bannerMessageHtml, {
            pkg: pkg
        }))
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
    var options = {
        uri: 'http://localhost:8889',
        app: 'Google Chrome'
            //app: 'firefox'
    };
    gutil.log('-----------------------------------------');
    gutil.log('Opening browser to:', gutil.colors.yellow('http://localhost:8889'));
    gutil.log('-----------------------------------------');
    gulp.src(__filename)
        .pipe(open(options));
});

gulp.task('copy-to-dist-folder', function() {
    return gulp.src(['dev/index.html', 'dev/style.css', 'dev/*.png', 'dev/*.jpg', 'dev/*.gif', 'dev/script.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    return gulp.src('dist/*')
        .pipe(zip('<%= archiveName %>'))
        .pipe(gulp.dest('delivery'));
});

gulp.task('basic-reload', function() {
    gulp.src('dev')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['dev/*.html', 'dev/*.js'], ['basic-reload']);
    gulp.watch(['dev/*.scss'], ['sass:dev']);
});

gulp.task('build', function(callback) {
    runSequence('del', 'copy-to-dist-folder', ['minify-html'], ['minify-inline', 'sass:dist'], 'uglify:dist', ['compress'],
        callback);
});

gulp.task('serve', function(callback) {
    runSequence('sass:dev', ['connect'], ['open', 'watch'],
        callback);
});

// Depricated: no longer needed because
// it is part of the 'build' sequence now.
gulp.task('finalize', ['compress']);

gulp.task('help', function() {
    gutil.log(gutil.colors.red('buildabanner'), 'help');
    gutil.log('--------------------------');
    gutil.log('There are 2 basic commands.');
    gutil.log(gutil.colors.yellow('gulp'), ': for dev use, spins up server w livereload as you edit files');
    gutil.log(gutil.colors.yellow('gulp build'), ': minifies files to', gutil.colors.red('dist'), 'directory');
    gutil.log('and zips same files in', gutil.colors.red('delivery'), 'directory');
    gutil.log('--------------------------');
});

gulp.task('default', ['serve']);
