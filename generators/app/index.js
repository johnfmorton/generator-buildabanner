'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var Download = require('download');
var camelCase = require('camelcase');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.bold.red('buildabanner') + ' generator!'
    ));

    var bannerSize = 'default';

    var prompts = [{
      type: 'input',
      name: 'bannerName',
      filter: function(answer) {
        return camelCase(answer)
      },
      message: 'Banner name (no spaces):',
      default: this.appname
    }, {
      type: 'input',
      name: 'bannerDesc',
      message: 'Description:',
      default: 'An HTML banner'
    }, {
      type: 'list',
      name: 'bannerType',
      message: 'What type of banner is this?',
      choices: ['Standard', 'AdWords', 'DoubleClick', 'TruEffect', 'Sizemek'],
      default: 'Standard'
    }, {
      type: 'list',
      name: 'bannerSize',
      message: 'Choose a size for this banner.',
      choices: ['300x250', '728x90', '970x90', '160x600', '300x600', '320x50'],
      default: '300x250'
    }, {
      type: 'confirm',
      name: 'includeGsap',
      message: 'Include GSAP for offline use?',
      default: false
    }, {
      when: function(answers) {
        return answers.bannerType === 'DoubleClick';
      },
      type: 'confirm',
      name: 'includeOfflineEnabler',
      message: "Include DoubleClick Enabler for offline use?",
      default: true
    }, {
      type: 'confirm',
      name: 'includeSublimeProject',
      message: 'Include SublimeText project file?',
      default: true
    }, {
      type: 'input',
      name: 'archiveName',
      message: 'Ad zip archive name? (Do not include .zip)',
      default: function(answers) {
        return answers.bannerName + "-" + answers.bannerSize
      }
    }];

    this.prompt(prompts, function(props) {
      /* Set the width and height properites based on bannerSize */
      switch (props.bannerSize) {
        case '320x50':
          props.bannerWidth = 318;
          props.bannerHeight = 48;
          props.actualBannerWidth = 320;
          props.actualBannerHeight = 50;
          break;
        case '300x600':
          props.bannerWidth = 298;
          props.bannerHeight = 598;
          props.actualBannerWidth = 300;
          props.actualBannerHeight = 600;
          break;
        case '728x90':
          props.bannerWidth = 726;
          props.bannerHeight = 88;
          props.actualBannerWidth = 728;
          props.actualBannerHeight = 90;
          break;
        case '970x90':
          props.bannerWidth = 968;
          props.bannerHeight = 88;
          props.actualBannerWidth = 970;
          props.actualBannerHeight = 90;
          break;
        case '160x600':
          props.bannerWidth = 158;
          props.bannerHeight = 598;
          props.actualBannerWidth = 160;
          props.actualBannerHeight = 600;
          break;
        case '300x250':
        default:
          props.bannerWidth = 298;
          props.bannerHeight = 248;
          props.actualBannerWidth = 300;
          props.actualBannerHeight = 250;
          break;
      }

      this.props = props;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var bannerSuffix;
      switch (this.props.bannerType) {
        case "AdWords":
          bannerSuffix = "_adwords";
          break;
        case "TruEffect":
          bannerSuffix = "_trueffect";
          break;
        case "DoubleClick":
          bannerSuffix = "_dc";
          break;
        case "Sizemek":
          bannerSuffix = "_sizemek";
          break;
        case "Standard":
        default:
          bannerSuffix = "_standard"
      }
      var bannerType = this.props.bannerType;
      var packageOptions = {
        bannerName: this.props.bannerName,
        bannerSize: this.props.bannerSize,
        bannerDesc: this.props.bannerDesc
      }
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        packageOptions
      );
      // process and copy the gulpfile
      var gulpfileOptions = {
        creativeName: this.props.bannerName,
        archiveName: this.props.archiveName,
        // this "openTag" variable is used to get a
        // reserved character set, <%=, into the gulpfile template
        openTag: '<%='
      }
      this.fs.copyTpl(
        this.templatePath('_gulpfile' + bannerSuffix + '.js'),
        this.destinationPath('gulpfile.js'),
        gulpfileOptions
      );
      // copy only select contents from the 'dev' folder
      this.fs.copy(
        this.templatePath('dev/!(_index.html|_*.*|*.src|_EBLoader*)'),
        this.destinationPath('dev')
      );
      // copy only select contents from the 'backupImages' folder
      this.fs.copy(
        // only copy the correct size of backup image to folder
        this.templatePath('backupImage/backup-' + this.props.bannerSize + '.gif'),
        this.destinationPath('backupImage/backup.gif')
      );
      // copy the correct README file
      this.fs.copy(
        this.templatePath('dev/_README' + bannerSuffix + '.md'),
        this.destinationPath('README.md')
      );
      if (bannerSuffix === '_sizemek') {
        // copy the EBLoader only if this is a Sizemek banner
        this.fs.copy(
          this.templatePath('dev/_EBLoader_sizemek.js'),
          this.destinationPath('dev/EBLoader.js')
        );
      }
      var scriptOptions = {
        bannerName: this.props.bannerName,
        bannerSize: this.props.bannerSize,
        bannerDesc: this.props.bannerDesc
      }
      this.fs.copyTpl(
        this.templatePath('dev/_script' + bannerSuffix + '.js'),
        this.destinationPath('dev/script.js'),
        scriptOptions
      );
      // process and copy the dev/index.html
      var indexOptions = {
        bannerName: this.props.bannerName,
        actualBannerWidth: this.props.actualBannerWidth,
        actualBannerHeight: this.props.actualBannerHeight
      }
      this.fs.copyTpl(
        this.templatePath('dev/_index' + bannerSuffix + '.html'),
        this.destinationPath('dev/index.html'),
        indexOptions
      );
      // process and copy the dev/style.scss
      var styleOptions = {
        bannerWidth: this.props.bannerWidth,
        bannerHeight: this.props.bannerHeight
      }
      this.fs.copyTpl(
        // there is only a single style file for all banner types
        this.templatePath('dev/_style.scss'),
        this.destinationPath('dev/style.scss'),
        styleOptions
      );
      // copy the SublimeText project file
      if (this.props.includeSublimeProject == true) {
        this.fs.copy(
          this.templatePath('_bannerbuilder.sublime-project'),
          this.destinationPath(this.props.bannerName + '.sublime-project')
        );
      }

      if (this.props.includeOfflineEnabler == true) {

        new Download({
          mode: '755'
        })
          .get('https://s0.2mdn.net/ads/studio/Enabler.js')
          .dest('offline')
          .run();
      }
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },


  install: function() {
    if (this.props.includeGsap === true) {
      this.npmInstall(['gsap'], {
        'saveDev': true
      });
    };
    // attempt to run NPM install automatically
    this.npmInstall();
  },

  end: function() {
    this.log('\n');
    this.log(chalk.bold.yellow('------------------------------------'));
    this.log(chalk.bold.yellow('|  Start by entering \'') + chalk.bold.blue('gulp') + chalk.bold.yellow('\' below  |'));
    this.log(chalk.bold.yellow('------------------------------------'));
    this.log(' ');
    this.log(chalk.bold.red('For help: gulp help'));
  }
});
