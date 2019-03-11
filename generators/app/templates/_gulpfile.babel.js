// <%= bannerType %> banner

// Rename the archive that will be created here
const archiveName = '<%= archiveName %>';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import del from 'del';
import header from 'gulp-header';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import open from 'gulp-open';

import htmlparser from 'htmlparser2';
import htmlmin from 'gulp-htmlmin';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import removeCode from 'gulp-remove-code';

import log from 'fancy-log';
import c from 'ansi-colors';
import fs from 'fs';
import notify from 'gulp-notify';

import imageSize from 'image-size';
import size from 'gulp-size';
import zip from 'gulp-zip';

import { argv } from 'yargs';


// read in the package file
const pkg = require('./package.json');

let devMode = argv.dev;

let serverInfo;

const paths = {
  styles: {
    src: 'dev/**/*.scss',
    dest: 'dist/'
  },
  scripts: {
    src: 'dev/**/*.js',
    dest: 'dist/'
  }
};

// Banner message to be appended to minified files
const nowDate = new Date();

const bannerMessageHtml = ['<!--',
  ' <%- openTag %> pkg.name <%- closeTag %> - <%- openTag %> pkg.description <%- closeTag %>',
  ' @version v<%- openTag %> pkg.version <%- closeTag %>',
  ' @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
  ' * Build A Banner info: https://www.npmjs.com/package/generator-buildabanner',
  ' -->',
  ' ',
  ''
].join('\n');

const bannerMessageJsCss = ['/**',
  ' * <%- openTag %> pkg.name <%- closeTag %> - <%- openTag %> pkg.description <%- closeTag %>',
  ' * @version v<%- openTag %> pkg.version <%- closeTag %>',
  ' * @date ' + (nowDate.getMonth() + 1) + "-" + nowDate.getDate() + "-" + nowDate.getFullYear() + " at " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds(),
  ' * Build A Banner info: https://www.npmjs.com/package/generator-buildabanner',
  ' */',
  ' ',
  ''
].join('\n');

function styles() {
  let cssCompression = devMode ? 'expanded' : 'compressed';
  let cssDestination = '.temp/';
  return gulp.src(paths.styles.src)
    .pipe(sass.sync({
      outputStyle: cssCompression,
      sourceComments: false
    }).on('error', sass.logError))
    // .pipe(autoprefixer())
    .pipe(header(bannerMessageJsCss, {
      pkg: pkg
    }))
    .pipe(gulp.dest(cssDestination))
    // The following line would "inject" changed CSS
    // back into your HTML. 
    //
    // .pipe(connect.reload());
    //
    // For banner dev, we usually want to 
    // force a full browser reload though
    // so we're purposefully not giving the 
    // changed CSS file to the reload command
    .pipe( gulp.src(__filename).pipe(connect.reload()) );
};

function scripts() {
  let beautify = devMode ? true : false;
  let jsDestination = '.temp/';
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(uglify({
      compress: {
        // compress options
        drop_console: true
      },
      mangle: false,
      output: {
        beautify: beautify
      }
    }))
    .pipe(header(bannerMessageJsCss, {
      pkg: pkg
    }))
    .pipe(gulp.dest(jsDestination))
    .pipe(connect.reload());
}

const compile = gulp.parallel(scripts, styles);
compile.description = 'Compile JS and SCSS'

/**
    Check file size of banner
*/

export function check() {
  return new Promise(function(resolve, reject) {
    log(c.yellow('******************************'));
    log(c.yellow('* Checking for banner errors *'));
    log(c.yellow('******************************'));
    log(c.yellow('* Scanning: ') + c.green('index.html') + c.yellow(' for ad.size metadata *'));
    // Read the index.html file in the dev folder
    fs.readFile('dev/index.html', 'utf8', function(err, theFileContents) {
      if (err) {
        log(c.red('*** metadata ad.size validation error encountered ***'));
        log(c.red(err));
      }
      var adSizeMetaData;
      var parser = new htmlparser.Parser({
        onopentag: function(name, attribs) {
          //log('opentag');
          if (name === "meta" && attribs.name === 'ad.size') {
            log(c.yellow('* Found ad.size metadata: ') + c.green(attribs.content));
            adSizeMetaData = attribs.content
            //log(attribs.content);
          }
        },
        ontext: function(text) {
          //console.log("-->", text);
        },
      }, { decodeEntities: true, recognizeSelfClosing: true });
      parser.write(theFileContents);
      parser.end();
      if (adSizeMetaData) {
        //log('adSizeMetaData: ' + adSizeMetaData)
      } else {
        log(c.red("ERROR: The metadata ad.size was not found in dev\/index.html"))
      }
      // Get a list of files in the backupImage directory
      var backupImages = fs.readdirSync('backupImage/');
      // remove invisible files from list, ie. .DS_Store
      backupImages = backupImages.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
      if (backupImages.length === 1) {
        // if there is the expected 1 file, let's proceed
        var expectedDimensions = imageSize('backupImage/' + backupImages[0]);
        var expectedDimensionsFormatted = 'width=' + expectedDimensions.width + ',height=' + expectedDimensions.height;
        log('expected: ' + expectedDimensionsFormatted);
        if (expectedDimensionsFormatted === adSizeMetaData) {
          log(c.green("SUCCESS: The metadata ad.size matched the dimensions of the backup image."));
        } else {
          log(c.red("ERROR: The metadata ad.size did not match the dimensions of the backup image."))
          log('expected: ' + c.red(expectedDimensionsFormatted))
          log('found   : ' + c.red(adSizeMetaData))
        }

      } else {
        log(c.red("ERROR: Expected 1 image in backupImage directory but found " + backupImages.length))
      }
      resolve();
    })

  });
}

check.description = 'Checks that adsize is defined in index.html and matches size of backup image. Also checks that only 1 backup image is present.';

function minifyHmtl() {
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
  return gulp.src('dev/*.html')
    .pipe(removeCode({ production: true }))
    .pipe(replace(consoleRegEx, ''))
    .pipe(htmlmin(opts))
    .pipe(header(bannerMessageHtml, {
      pkg: pkg
    }))
    .pipe(gulp.dest('.temp/'));
}

/**
BUILD process
*/

// This function takes processed index.html, style.css, and script.js from the .temp folder plus select assets files from the 'dev' folder and moves them all into the dist folder. It will specifically NOT copy "comp" files. To be considered a "comp" file, the filename must begin with "comp", like "comp-1.jpg", "comp2.png", etc.
function copydist() {
    return gulp.src(['.temp/index.html', '.temp/style.css', '.temp/script.js', 'dev/**/*.mp4', 'dev/**/*.ogv', 'dev/**/*.ogg', 'dev/**/*.webm','dev/**/*.png', 'dev/**/*.jpg', 'dev/**/*.gif', 'dev/**/*.svg', 'dev/config.js', '!dev/comp*'], {allowEmpty: true})
        .pipe(gulp.dest('dist'));
};


function compress() {
    const s = size({showFiles: false, gzip: false, showTotal:false});
    // this run AFTER the copydist function, so all files that make up the banner are in the 
    // 'dist' folder at this point. 
    return gulp.src('dist/**/*')
        // for quick access, you can change this
        // name at the top of this file
        .pipe(zip(archiveName+'.zip'))
        .pipe(s)
        .pipe(gulp.dest('delivery'))
        .pipe(notify({
          title: "Build A Banner",
          templateOptions: {
            date: new Date(),
          },
          message: () => { return archiveName + '.zip : ' + s.prettySize },
          onLast: true,
        }));
}

export const clean = () => del(['dist', 'archive', 'delivery', '.temp']);
clean.description = 'Removes the automatically created Build A Banner directories: dist, archive, delivery and .temp';

function copyBackupFile() {
    var sourceFiles = gulp.src(['backupImage/*.png', 'backupImage/*.jpg', 'backupImage/*.gif']);
    return gulp.src(['backupImage/*.png', 'backupImage/*.jpg', 'backupImage/*.gif'])
    .pipe(rename({
        basename: archiveName + '-backup'
        }))
    .pipe(gulp.dest('delivery'));
};


export const build = gulp.series(clean, check, styles, scripts, minifyHmtl, copydist, compress, copyBackupFile);
build.description = 'Builds development files into minified files ready for delivery to a media company.';

/**
end of BUILD process
*/


/**
Begin ARCHIVE process
*/

export function archive() {
    // make a zip all the files, including dev folder, for archiving the banner
   var success = gulp.src(['gulpfile*.js', 'package.json', '*.sublime-project', 'dev/**/*', 'dist/**/*', 'backupImage/*', 'delivery/**/*'], {cwdbase: true, allowEmpty: true})
        // for quick access, you can change this name at the top of this file
        .pipe(zip('archive-'+archiveName+'.zip'))
        .pipe(gulp.dest('archive'));
    log('--------------------------------');
    log('Your banner has been archived in');
    log('archive/'+ c.yellow('archive-'+archiveName+'.zip') );
    log('--------------------------------');
    return success;
};

archive.description = 'Create an archive of the banner project.'

/**
END ARCHIVE process
*/

export const ba = gulp.series(build, archive);
ba.description = "Shortcut to build and then archive a banner."


// This serve task is not directly exported
function serve() {
  return new Promise(function(resolve, reject) {
    serverInfo = connect.server({
      name: 'Build A Banner Server',
      port: 8889,
      root: ['dev', '.temp'],
      livereload: true,
    });
    resolve();
  });
}

function openBrowser() {
  return new Promise(function(resolve, reject) {
    gulp.src(__filename)
      .pipe(open({
        uri: `http://localhost:${serverInfo.port}`
      }));
    resolve();
  });
}

function basicReload(done) {
  gulp.src(__filename).pipe(connect.reload())
  done();
}

// This watch is not exported
function watch() {
  return new Promise(function(resolve, reject) {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(['dev/index.html'], basicReload);
    resolve();
  });
}

// Not exported
function turnOnDevMode() {
  return new Promise(function(resolve, reject) {
    devMode = true;
    log("DevMode is on");
    resolve();
  });
}

export function man() {
  return new Promise(function(resolve, reject) {
    log(c.red('buildabanner'), 'help');
    log('--------------------------');
    log('There are 3 basic commands.');
    log(c.yellow('gulp'), ': for dev use, spins up server w livereload as you edit files');
    log(c.yellow('gulp build'), ': minifies files from the dev directory into the', c.red('dist'), 'directory');
    log('and creates a zip of these files in', c.red('delivery'), 'directory');
    log(c.yellow('gulp archive'), 'takes files from the '+ c.red('dev'), 'directory' + ' plus other important files');
    log('and zips them in the', c.red('archive'), 'directory for archival purposes.');
    log('BONUS:', c.green('gulp ba'), 'is a shortcut to run build and then archive.');
    log('--------------------------');
    resolve();
  });
}

man.description = 'Help on how to use Build A Banner';

const defaultTasks = gulp.series(clean, turnOnDevMode, compile, gulp.parallel(serve, watch),openBrowser);

defaultTasks.description = 'Clean your development environment and spin up a server for banner development.'


export default defaultTasks
