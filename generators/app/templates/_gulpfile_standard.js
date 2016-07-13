// Standard HTML polite banner
// <%= creativeName %>

// Rename the archive that will be created here
const archiveName = '<%= archiveName %>';

// dependencies
const gulp = require('gulp');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const minifyHTML = require('gulp-htmlmin');
const rename = require('gulp-rename');
const del = require('del');
const connect = require('gulp-connect');
const open = require('gulp-open');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');
const header = require('gulp-header');
const replace = require('gulp-replace');
const htmlparser = require("htmlparser2");
// used to guess expected size of banner based on the backup image
const sizeOf = require('image-size');
// used to get the GZIP size of the banner during the build process
const size = require('gulp-size');
const notify = require("gulp-notify");

const fs = require('fs');

// read in the package file
const pkg = require('./package.json');

// Banner message to be appended to minified files
const nowDate = new Date();

const bannerMessageHtml = ['<!--',
    ' <%= openTag %> pkg.name %> - <%= openTag %> pkg.description %>',
    ' @version v<%= openTag %> pkg.version %>',
    ' @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
    ' -->',
    ''
].join('\n');
const bannerMessageJsCss = ['/**',
    ' * <%= openTag %> pkg.name %> - <%= openTag %> pkg.description %>',
    ' * @version v<%= openTag %> pkg.version %>',
    ' * @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
    ' */',
    ''
].join('\n');

// TASKS

// CHECK task - reading index.html and then check the meta tag for size

gulp.task('check', function() {
    gutil.log( gutil.colors.yellow('******************************'));
    gutil.log( gutil.colors.yellow('* Checking for banner errors *'));
    gutil.log( gutil.colors.yellow('******************************'));
    gutil.log( gutil.colors.yellow('* Scanning: ')+ gutil.colors.green('index.html') + gutil.colors.yellow(' for ad.size metadata *'));

    // Read the index.html file in the dev folder
    fs.readFile('dev/index.html', 'utf8', function (err,theFileContents) {
      if (err) {
        gutil.log( gutil.colors.red( '*** metadata ad.size validation error encountered ***') );
        gutil.log( gutil.colors.red( err) );
      }
      var adSizeMetaData;
      var parser = new htmlparser.Parser({
        onopentag: function(name, attribs) {
          //gutil.log('opentag');
            if (name === "meta" && attribs.name === 'ad.size') {
              gutil.log( gutil.colors.yellow('* Found ad.size metadata: ')+ gutil.colors.green(attribs.content) );
              adSizeMetaData = attribs.content
              //gutil.log(attribs.content);
            }
        },
        ontext: function(text){
          //console.log("-->", text);
        },
        }, {decodeEntities: true, recognizeSelfClosing: true});
      parser.write(theFileContents);
      parser.end();

      if (adSizeMetaData) {
        //gutil.log('adSizeMetaData: ' + adSizeMetaData)
      } else {
        gutil.log(gutil.colors.red("ERROR: The metadata ad.size was not found in dev\/index.html"))
      }
      // Get a list of files in the backupImage directory
      var backupImages = fs.readdirSync('backupImage/');
      // remove invisible files from list, ie. .DS_Store
      backupImages = backupImages.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

      if (backupImages.length === 1) {
        // if there is the expected 1 file, let's proceed
        var expectedDimensions = sizeOf('backupImage/' + backupImages[0]);
        var expectedDimensionsFormatted = 'width=' + expectedDimensions.width + ',height=' + expectedDimensions.height;
        gutil.log('expected: ' + expectedDimensionsFormatted);
        if (expectedDimensionsFormatted === adSizeMetaData) {
            gutil.log(gutil.colors.green("SUCCESS: The metadata ad.size matched the dimensions of the backup image."));
          } else {
            gutil.log(gutil.colors.red("ERROR: The metadata ad.size did not match the dimensions of the backup image."))
            gutil.log('expected: ' + gutil.colors.red(expectedDimensionsFormatted))
            gutil.log('found   : ' + gutil.colors.red(adSizeMetaData))
          }

      } else {
        gutil.log(gutil.colors.red("ERROR: Expected 1 image in backupImage directory but found " + backupImages.length))

      }

    });

  })

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
        .pipe(gulp.dest('dev'));
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
    return gulp.src(['dev/index.html', 'dev/style.css', 'dev/*.png', 'dev/*.jpg', 'dev/*.gif', 'dev/*.svg', 'dev/script.js', '!dev/comp*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
    var s = size({showFiles: false, gzip: false, showTotal:false});
    return gulp.src('dist/*')
        // for quick access, you can change this
        // name at the top of this file
        .pipe(zip(archiveName+'.zip'))
        .pipe(s)
        .pipe(gulp.dest('delivery'))
        .pipe(notify({
          onLast: true,
          message: function() { return archiveName + '.zip : ' + s.prettySize }
        }));
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
    gulp.watch(['dev/*.css'], ['basic-reload']);
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

// Shortcut to build and archive all at once
gulp.task('ba', function() {runSequence(['check'], ['build'], ['archive'])});

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
