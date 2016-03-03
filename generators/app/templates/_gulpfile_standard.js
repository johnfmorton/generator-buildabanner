// Standard HTML polite banner
// <%= creativeName %>

// Rename the archive that will be created here
var archiveName = '<%= archiveName %>';

// dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyHTML = require('gulp-htmlmin');
var rename = require('gulp-rename');
var del = require('del');
var connect = require('gulp-connect');
var open = require('gulp-open');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');
var header = require('gulp-header');
var filesize = require('gulp-filesize');
var replace = require('gulp-replace');

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


gulp.task('sass:dev', function() {
    return gulp.src('dev/style.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }).on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dev'))
        .pipe(connect.reload());;
});

gulp.task('sass:dist', function() {
    return gulp.src('dev/style.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(header(bannerMessageJsCss, {
            pkg: pkg
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function() {
    var opts = {
        collapseWhitespace: true, // must be true if conservativeCollapse or preserveLineBreaks are used as true
        conservativeCollapse: false, // true: collapse to 1 space (never remove it entirely)
        preserveLineBreaks: false, // true: collapse to 1 line break (never remove it entirely)
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyJS: true, // minify Javascript in script elements and on* attributes
        minifyCSS: true // minify CSS in style elements and style attributes
    };
    var consoleRegEx = /console\.(clear|count|debug|dir|dirxml|error|group|groupCollapsed|groupEnd|info|profile|profileEnd|time|timeEnd|timeStamp|trace|log|warn) *\(.*\);?/gi;
    return gulp.src('dist/*.html')
        .pipe(replace(consoleRegEx, ''))
        .pipe(minifyHTML(opts))
        .pipe(header(bannerMessageHtml, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('del', function() {
    del([
        'dist/*',
        'archive/*'
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
    return gulp.src(['dev/index.html', 'dev/style.css', 'dev/*.png', 'dev/*.jpg', 'dev/*.gif', 'dev/script.js', '!dev/comp*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    return gulp.src('dist/*')
        // for quick access, you can change this
        // name at the top of this file
        .pipe(zip(archiveName+'.zip'))
        .pipe(filesize())
        .pipe(gulp.dest('delivery'));
});


gulp.task('archive', function() {
    // make a zip all the files, including dev folder, for archiving the banner
   var success = gulp.src(['gulpfile.js', 'package.json', '*.sublime-project', 'dev/*', 'dist/*', 'backupImage/*', 'delivery/*'], {cwdbase: true})
        // for quick access, you can change this
        // name at the top of this file
        .pipe(zip('archive-'+archiveName+'.zip'))
        .pipe(gulp.dest('archive'));
    gutil.log('--------------------------------');
    gutil.log('Your banner has been archived in');
    gutil.log('archive/'+ gutil.colors.yellow('archive-'+archiveName+'.zip') );
    gutil.log('--------------------------------');
    return success;
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
    runSequence('del', 'copy-to-dist-folder', 'minify-html', 'sass:dist', ['uglify:dist'], ['compress'], 'copyBackupFile',
        callback);
});

gulp.task('serve', function(callback) {
    runSequence('sass:dev', ['connect'], ['open', 'watch'],
        callback);
});

gulp.task('copyBackupFile', function() {
    var sourceFiles = gulp.src(['backupImage/*.png', 'backupImage/*.jpg', 'backupImage/*.gif']);
    return gulp.src(['backupImage/*.png', 'backupImage/*.jpg', 'backupImage/*.gif'])
    .pipe(rename({
        basename: archiveName + '-backup'
        }))
    .pipe(gulp.dest('delivery'));
});

// Depricated: no longer needed because
// it is part of the 'build' sequence now.
gulp.task('finalize', ['compress']);

gulp.task('help', function() {
    gutil.log(gutil.colors.red('buildabanner'), 'help');
    gutil.log('--------------------------');
    gutil.log('There are 3 basic commands.');
    gutil.log(gutil.colors.yellow('gulp'), ': for dev use, spins up server w livereload as you edit files');
    gutil.log(gutil.colors.yellow('gulp build'), ': minifies files from the dev directory into the', gutil.colors.red('dist'), 'directory');
    gutil.log('and creates a zip of these files in', gutil.colors.red('delivery'), 'directory');
    gutil.log(gutil.colors.yellow('gulp archive'), 'takes files from the '+ gutil.colors.red('dev'), 'directory' + ' plus other important files');
    gutil.log('and zips them in the', gutil.colors.red('archive'), 'directory for archival purposes.');
    gutil.log('--------------------------');
});

gulp.task('default', ['serve']);
