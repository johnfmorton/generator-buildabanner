# Build A Banner Yeoman Workflow

## Changelog

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

