'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.bold.red('Buildabanner') + ' generator!'
        ));

        var bannerSize = 'default';

        var prompts = [{
            type: 'input',
            name: 'bannerName',
            message: 'What is the name of your banner?',
            default: this.appname
        }, {
            type: 'list',
            name: 'bannerSize',
            message: 'Choose a size for this banner.',
            choices: ['300x250', '728x90', '160x600', '300x600'],
            default: '300x250'
        }, {
            type: 'confirm',
            name: 'includeGsap',
            message: 'Would you like to include GSAP?',
            default: true
        }, {
            type: 'input',
            name: 'archiveName',
            message: 'When this ad is zipped, what should it be called? ',
            default: 'banner_archive.zip'
        }];

        this.prompt(prompts, function(props) {
            /* Set the width and height properites based on bannerSize */
            switch (props.bannerSize) {
                case '300x600':
                    props.bannerWidth = 298;
                    props.bannerHeight = 598;
                    break;
                case '728x90':
                    props.bannerWidth = 726;
                    props.bannerHeight = 88;
                    break;
                case '160x600':
                    props.bannerWidth = 158;
                    props.bannerHeight = 598;
                    break;
                case '300x250':
                default:
                    props.bannerWidth = 298;
                    props.bannerHeight = 248;
                    break;
            }

            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.fs.copy(
                this.templatePath('_package.json'),
                this.destinationPath('package.json')
            );
            var gulpfileOptions = {
                creativeName: this.props.bannerName,
                archiveName: this.props.archiveName
            }
            this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js'),
                gulpfileOptions
            );
            this.fs.copy(
                this.templatePath('dev/!(_index.html|_*.*|*.src)'),
                this.destinationPath('dev')
            );
            var indexOptions = {
                title: this.props.bannerName
            }
            this.fs.copyTpl(
                this.templatePath('dev/_index.html'),
                this.destinationPath('dev/index.html'),
                indexOptions
            );
            var styleOptions = {
                bannerWidth: this.props.bannerWidth,
                bannerHeight: this.props.bannerHeight
            }
            this.fs.copyTpl(
                this.templatePath('dev/_style.scss'),
                this.destinationPath('dev/style.scss'),
                styleOptions
            );

            //this.fs.copy(
            //this.templatePath('_bower.json'),
            //this.destinationPath('bower.json')
            //);
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
        }
    },


    install: function() {
        if (this.props.includeGsap == true) {
            this.npmInstall(['gsap'], {
                'saveDev': true
            });
        };
        //this.installDependencies();
       this.npmInstall();
    },

    end: function() {
        console.log('\n');
        console.log(chalk.bold.yellow('************************************'));
        console.log(chalk.bold.yellow('* Start by entering \'') + chalk.bold.blue('gulp') + chalk.bold.yellow('\' below *'));
        console.log(chalk.bold.yellow('************************************'));
        console.log(' ');
        console.log(chalk.bold.red('Now go build a that banner.'));
    }
});
