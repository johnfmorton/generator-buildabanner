'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('buildabanner:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates banner files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'gulpfile.js',
      'dev/index.html',
      'dev/script.js',
      'dev/style.scss',
      'backupImage/backup.gif'
    ]);
  });
});
