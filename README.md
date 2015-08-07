# generator-buildabanner 

This is a [Yeoman](http://yeoman.io) generator to get a starter DoubleClick banner scaffolded out quickly.

## Notes

First of all, this is very much a work in progress. It makes many assumptions as to how you'll be building a banner.

## Basic usage

Link this workflow into your own NPM installation using `npm link` when you are in the *generator-buildabanner* directory from in your terminal.

To get started use `yo buildabanner` and answer the prompts.

### gulp command

`gulp` : This is the most basic command. It will spin up a server in your 'dev' folder. It will compile your SCSS into CSS. It will also watch for changes in the index.html, scripts.js and style.scss files and reload Google Chrome.

`gulp build` : This command will create a 'dist' folder and fill it with minified versions of your files.

`gulp finalize` : This command will take whatever you have in the 'dist' folder and will compress it into a zip file in the 'delivery' folder. 

## License

MIT
