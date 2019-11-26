'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const download = require('download');
// const camelCase = require('camelcase');
const slugify = require('@sindresorhus/slugify');

// let myanswers;

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts)
        // this.method3 = function() {
        //     this.log('method 3 is in the constructor');
        // }
    }

    // method1() {
    //     this.log('method 1 just ran');
    // }

    // method2() {
    //     this.log('method 2 just ran');
    //     this.method3();
    //     this._method4();
    // }

    // _method4() {
    //     this.log('method 4 is private');
    // }

    initializing() {
        this.log('initializing')
    }

    prompting() {
        var done = this.async();

        // Greetings, builder of banners
        this.log(yosay(
            'Welcome to the ' + chalk.bold.red('buildabanner') + ' generator!'
        ));

        var bannerSize = 'default';

        var prompts = [{
            type: 'input',
            name: 'bannerName',
            filter: function(answer) {
                return slugify(answer)
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
            choices: ['Google Ad (DCM/Ad Words)', 'DoubleClick', 'Standard Non-Google Ad', 'Sizmek'],
            default: 'Google Ad (DCM/Ad Words)'
        }, {
            type: 'list',
            name: 'bannerSize',
            message: 'Choose a size for this banner.',
            choices: ['300x250', '728x90', '970x90', '970x250', '160x600', '300x600', '320x50', '300x50', '300x100'],
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

        // this.log('prompting')

        // return this.prompt([{
        //     type: 'input',
        //     name: 'name',
        //     message: 'Your project name',
        //     default: this.appname // Default to current folder name
        // }, {
        //     type: 'confirm',
        //     name: 'cool',
        //     message: 'Would you like to enable the Cool feature?'
        // }]).then((answers) => {
        //     this.log('app name', answers.name);
        //     this.log('cool feature', answers.cool);
        //     this.userAnswers = answers;
        //     done();
        // });

        return this.prompt(prompts).then((answers) => {
            this.log('Banner Name', answers.bannerName);
            this.log('Banner Type', answers.bannerType);
            this.props = answers;

            /* Set the width and height properites based on bannerSize */
            switch (this.props.bannerSize) {
                case '300x100':
                    this.props.bannerWidth = 298;
                    this.props.bannerHeight = 98;
                    this.props.actualBannerWidth = 300;
                    this.props.actualBannerHeight = 100;
                    break;
                case '300x50':
                    this.props.bannerWidth = 298;
                    this.props.bannerHeight = 48;
                    this.props.actualBannerWidth = 300;
                    this.props.actualBannerHeight = 50;
                    break;
                case '320x50':
                    this.props.bannerWidth = 318;
                    this.props.bannerHeight = 48;
                    this.props.actualBannerWidth = 320;
                    this.props.actualBannerHeight = 50;
                    break;
                case '300x600':
                    this.props.bannerWidth = 298;
                    this.props.bannerHeight = 598;
                    this.props.actualBannerWidth = 300;
                    this.props.actualBannerHeight = 600;
                    break;
                case '728x90':
                    this.props.bannerWidth = 726;
                    this.props.bannerHeight = 88;
                    this.props.actualBannerWidth = 728;
                    this.props.actualBannerHeight = 90;
                    break;
                case '970x90':
                    this.props.bannerWidth = 968;
                    this.props.bannerHeight = 88;
                    this.props.actualBannerWidth = 970;
                    this.props.actualBannerHeight = 90;
                    break;
                case '970x250':
                    this.props.bannerWidth = 968;
                    this.props.bannerHeight = 248;
                    this.props.actualBannerWidth = 970;
                    this.props.actualBannerHeight = 250;
                    break;
                case '160x600':
                    this.props.bannerWidth = 158;
                    this.props.bannerHeight = 598;
                    this.props.actualBannerWidth = 160;
                    this.props.actualBannerHeight = 600;
                    break;
                case '300x250':
                default:
                    this.props.bannerWidth = 298;
                    this.props.bannerHeight = 248;
                    this.props.actualBannerWidth = 300;
                    this.props.actualBannerHeight = 250;
                    break;
            }
            done();
        })
    }

    writing() {
        var bannerSuffix;
        var bannerType = this.props.bannerType;
        switch (bannerType) {
            case "DoubleClick":
                bannerSuffix = "_dc";
                break;
            case "Sizmek":
                bannerSuffix = "_sizmek";
                break;
            case "Standard Non-Google Ad":
                bannerSuffix = "_nongoogle";
                break;
            case "Google Ad (DCM/Ad Words)":
            default:
                bannerSuffix = "_standard"
        }
        
        // Yo, check your props.
        // this.log(this.props)

        var packageOptions = {
            bannerType: this.props.bannerType,
            bannerName: this.props.bannerName,
            bannerSize: this.props.bannerSize,
            bannerDesc: this.props.bannerDesc
        }
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            packageOptions
        );
        this.fs.copyTpl(
            this.templatePath('_babelrc'),
            this.destinationPath('.babelrc'),
            packageOptions
        );

        // a non-google ad needs to add
        // URL parameters to the dev server
        // so set up URL parameters for that case

        var urlParameters = '';

        if (this.props.bannerType === "Standard Non-Google Ad") {
            urlParameters = '?clickTAG=http://example.com';
        }

        // process and copy the gulpfile
        var gulpfileOptions = {
            bannerType: this.props.bannerType,
            creativeName: this.props.bannerName,
            archiveName: this.props.archiveName,
            urlParameters: urlParameters,
            // this "openTag" variable is used to get a
            // reserved character set, <%=, into the gulpfile template
            openTag: '<%=',
            closeTag: '%>'
        }
        this.fs.copyTpl(
            this.templatePath('_gulpfile.babel.js'),
            this.destinationPath('gulpfile.babel.js'),
            gulpfileOptions
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

        if (bannerType === 'Sizmek') {
            // copy the Sizmek-specific config.js file
            this.fs.copy(
                this.templatePath('dev/_config_sizmek.js'),
                this.destinationPath('dev/config.js')
            );
        }
        var scriptOptions = {
            bannerType: this.props.bannerType,
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
            bannerType: this.props.bannerType,
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
            bannerType: this.props.bannerType,
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
            (async () => {
            await download('https://s0.2mdn.net/ads/studio/Enabler.js', 'offline');
            })();
        }

        // Editor config file
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        // JS hint file
        this.fs.copy(
            this.templatePath('jshintrc'),
            this.destinationPath('.jshintrc')
        );
        // gitignore
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );
    }

    // configuring() {
    //     this.log('configuring', this.props.name)
    //     this.log(this.props)
    // }

    install() {
        this.log('install')
        if (this.props.includeGsap === true) {
            this.npmInstall(['gsap'], {
                'saveDev': true
            });
        };
        // attempt to run NPM install automatically
        this.npmInstall();
    }

    end() {
        // this.log('end')
        this.log('\n');
        this.log(chalk.bold.yellow('------------------------------------'));
        this.log(chalk.bold.yellow('|  Start by entering \'') + chalk.bold.blue('gulp') + chalk.bold.yellow('\' below  |'));
        this.log(chalk.bold.yellow('------------------------------------'));
        this.log(' ');
        this.log(chalk.bold.red('For help: gulp man'));
    }

}