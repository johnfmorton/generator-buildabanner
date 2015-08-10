# generator-buildabanner 

This is a [Yeoman](http://yeoman.io) generator to get a starter DoubleClick banner scaffolded out quickly.

<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/_7dIIwlGdwU&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/_7dIIwlGdwU&hl=en&fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object>

## Notes

First of all, this is very much a work in progress. It makes many assumptions as to how you'll be building a banner.

## Basic usage

Link this workflow into your own NPM installation using `npm link` when you are in the *generator-buildabanner* directory from in your terminal.

To get started use `yo buildabanner` and answer the prompts.

### gulp commands

`gulp` : This is the most basic command. It will spin up a server in your 'dev' folder. It will compile your SCSS into CSS. It will also watch for changes in the index.html, scripts.js and style.scss files and reload Google Chrome.

`gulp build` : This command will create a 'dist' folder and fill it with minified versions of your files.

`gulp finalize` : This command will take whatever you have in the 'dist' folder and will compress it into a zip file in the 'delivery' folder. 

### About offline usage

Working on a DoubleClick banner requires that you have an Internet connection to load the Enabler.js. This workflow offers to download a copy of the Enabler.js. If you choose to do this, it places a copy of Enabler.js in a folder called "offline".

The workflow also offers to download a copy of the Greensock library for off-line use. Since Greensock is offered via npm, it will be placed in the 'node_modules' folder.

Both of these prompts for offline use default to "yes". The code they download is not referenced in the HTML presently though. You will need to manually update the HTML to load them. I've included the download of these files because I sometimes find that I need to work on these projects when having a stable Internet connection isn't possible. Having the files downloaded into my project is a failsafe.

Eventually, I will add an option to automatically include these files by doing something like `gulp --offline`. I'm still deciding the approach I want to take for this though.

### To do

Below are some goal posts for the future of this workflow.

1. Adding `gulp --offline` as menitoned in the previous section.
2. Adding `gulp help` to return a quick primer on how to use the workflow.
3. I'm considering adding image optimization, but I currently like to have complete control of my images, so that is not high on my list.
4. Add size reporting. I'm looking at https://www.npmjs.com/package/gulp-sizereport/ and https://www.npmjs.com/package/gulp-size/ for this currently.

## License

MIT
