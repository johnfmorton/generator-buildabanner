# Build A Banner Yeoman Workflow

## Changelog

## [2.1.1] - 2022-03-06
- Updated readme to remove reference to beta version in favor of release version.

## [2.1.0] - 2022-03-06
- Pushing the beta version to production.

## [2.1.0-beta.4] - 2022-03-01
- Updated the clickTag URL to 'http://www.google.com' from 'http://example.com' due to ad being rejected by trafficker of recent banner ad.
- Updated versions default JS animation libraries.

## [2.1.0-beta.3] - 2022-02-05
## [2.1.0-beta.2] - 2022-02-05
## [2.1.0-beta.1] - 2022-02-04
- Reworking to allow Build A Banner to work in a Docker container.

## [2.0.15] - 2021-01-16

### Added

- Added new banner type, standard Google banner with IAB Subload. This is to conform to the "subload" as outlined in this IAB post: https://iabtechlab.com/blog/building-light-weight-and-load-optimized-ad-creatives/

### Changed

- The packages used in banner builder have been updated as follows:
- ansi-colors from 2.0.5 to 4.1.1
- del from 3.0.0 to 6.0.0
- gulp-htmlmin from 4.0.0 to 5.0.1
- gulp-rename from 1.4.0 to 2.0.0
- gulp-zip from 4.2.0 to 5.0.2
- htmlparser2 from 3.10.1 to 6.0.0
- image-size from 0.6.3 to 0.9.3
- yargs from 12.0.5 to 16.2.0

## [2.0.14] - 2020-04-08

### Fixed

- Added changelog that was missing in 2.0.13

## [2.0.13] - 2020-04-08

### Fixed

- Fixed the banner name prompt needed be restructured to return a promise
- Updated outdated packages

## [2.0.12] - 2019-11-26

### Fixed

- Fixed error when using the "Doubleclick" build option. Error would occur when choosing to download a local copy of the Enabler.js. It now works as expected.
- In DoubleClick starter script.js added missing parentheses.
- Updated yeoman-generator to fix audit warnings
- Updated gulp.babel.js syntax to CommonJS. Using require instead of import.
- Updated Babel from 6.26.3 to 7.7.4
- Updated Gulp Babel from 7.01 to 8.0.0
- removed unneeded "run-sequence" dependency from the banner build process
- Updated Sizmek to use EB library instead of adkit.js. This required changes to index.html for clickthrough to fire
- Updated to Greensock 3.0.1 from Greensock v2.
- Updated CDN links for all other libraries referenced in code comments.

## [2.0.11] - 2019-05-11

### Added

- A new banner type has been added "Standard Non-Google Ad".

### Changed

- The "Standard/AdWords" has been renamed "Google Ad (DCM/Ad Words)"

### Fixed

- Banner archive was not including the invisible files like .babelrc and .gitignore in the archive. This is now fixed.

## [2.0.10] - 2019-03-12

### Fixed

- A failed git merge resulted in 2.0.9 being identical to 2.0.8. Version 2.0.10 is a fix to get the changes to actully be in the code release.

## [2.0.9] - 2019-03-11

### Added

- A basic "config.js" file is now created when initializing a Sizmek banner. The config file, when present, will also be packaged with the banner when doing a build.

## [2.0.8] - 2019-02-05

### Changed

- The "transform-origin" suggested style has browser prefixes removed
- The gitignore file now ignores the `.temp` directory used by BAB to serve WIP builds

## [2.0.7] - 2019-01-11

### Fixed

- Sizmek banner build always reported banner size meta data as 300x250 and that has been corrected.

### Changed

- Sizmek platform updated required some changes to the clickthru code. It's now wrapped in a listener. Notes on Sizmek changes, including notes on the possible need for a config.js file were added to the Sizmek readme file.

## [2.0.5] - 2018-08-14

### Changed

- Added "use strict" to default JS file for banners since minification adds it anyway. Helps prevent errors in production build of JS.

## [2.0.4] - 2018-08-03

### Changed

- Changes in SCSS files during development will now force a browser reload instead of injecting CSS changes into the banner.

## [2.0.3] - 2018-07-30

### Fixed

- The JS minification settings were too aggressive and would break some banners. It's been ratched down to not manage variable names.
- The default "script.js" file has also changed the function style from named functions to function declarations.

## [2.0.2] - 2018-07-30

### Fixed

- Some dependencies were listed in "devDependencies" which meant they did not install from the production version of BAB. They've been moved to the correct spot in the package.json file.

## [2.0.1] - 2018-07-27

### Fixed

- The 'gulp man' function now returns a promise and will not cause a warning.
- This changelog has been updated to match the formatting of https://keepachangelog.com/en/1.0.0/ and have real content.

### Changed

- The default banner seen immediately after installation has changed to be a little more pleasing and provide an example of styling and animation.

## [2.0.0] - 2018-07-15

### Added

- This is a rebuild of the Yeoman Build A Banner workflow.
- Now uses Gulp 4
