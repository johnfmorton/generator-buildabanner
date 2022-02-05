# generator-buildabanner

This is a [Yeoman](https://yeoman.io) generator to get a starter standard, AdWords, Sizmek or DoubleClick banner scaffolded out quickly.

## Beta version for Docker comptatibilty

This [beta version](https://www.npmjs.com/package/generator-buildabanner/v/2.1.0-beta.2) of Build A Banner is nearly identical to version 2.0.15 except that has had modifications to make it work inside a Docker container.

1. I've removed the "gulp-notify" plugin since when run within a Docker container, those messages were not reaching the host operating system. The messages that were generated in a notification now happen in the console.
2. Attempting to open the browser window when running the `gulp` command would cause an error when Build A Banner was running in a container so that has been removed. You now must open your browswer window manually.
3. Lastly, to allow the Docker container to expose the dev server's port, the host has changed from "localhost" to "0.0.0.0".

To install the beta version, use this command to specify the `beta` tag:
`npm install -g generator-buildabanner@beta`
## Version 2

After 37 releases, Build A Banner has jumped to the 2.0 version. There was never a version 1 in all the previous 37 releases. It had always been version 0 although at some point it should have graduated to version 1. It just didn't happen.

In the Version 2, the Yeoman generator has been rewritten. It has moved to Gulp 4. How you use BAB should remain basically the same though. There have been a lot of updating of the tools behind the scenes to keep current.

## Let me show you how this works.

Click the image for a video walk through.

[![Video Walk Thru](https://cloud.githubusercontent.com/assets/119723/9295071/84157934-4415-11e5-907d-3fb40bceb977.jpg)](https://www.youtube.com/watch?v=_7dIIwlGdwUl)

## Notes

This is an evolving work in progress. I refine it as I discover better processes. It is an opinionated workflow to speed the production of building a banner. It includes options for HTML banners for standard, AdWords, or DoubleClick HTML banners.

## Basic usage

You may install this [Yeoman](http://yeoman.io/ "Yeoman homepage") workflow through _npm_.

`npm install -g generator-buildabanner`

You may also link this workflow locally into your own NPM installation using `npm link` when you are in the _generator-buildabanner_ directory from within your terminal.

To get started use `yo buildabanner` and answer the prompts.

### gulp commands

`gulp` : This is the most basic command. It will spin up a server in your 'dev' folder. It will compile your SCSS into CSS. It will also watch for changes in the index.html, scripts.js and style.scss files and reload Google Chrome.

`gulp check` : This command is useful to check for some basic consistency in your banner. It will confirm that the metadata ad.size matches the size of your backup image. It also checks to see if you have a single image in the backImage directory.

`gulp build` : This command will create a 'dist' folder and fill it with minified versions of your files. It will also compress these same files into a zip file in the 'delivery' folder. NOTE: If you've used files starting with "comp", like "comp1.png" or "comp2.jpg", which can be used for positioning elements in your banner, they will _not_ be included in your 'dist' folder. This is important to know if you happen to have a file called "competition.jpg" in your banner build because it will excluded.

`gulp archive` : This command will create an 'archive' folder and a single zip file that contains the contents of your _dev_, _dist_ and _delivery_ directories plus your _package.json_, _gulpfile.js_ and your Sublime Text project file. These are the necessary files to archive your banner once it is finished. (Your node_modules directory can be recreated later with `npm install`.)

`gulp ba` : This is a shortcut for running `check`, `build`, `archive` in sequence.

`gulp man` : Will provide info on the available comands.

### About offline usage

The workflow offers to download a copy of the Greensock library for off-line use. Since Greensock is offered via npm, it will be placed in the 'node_modules' folder.

Working on a DoubleClick banner requires that you have an Internet connection to load the Enabler.js. The workflow offers to download a copy of the Enabler.js. If you choose to do this, it places a copy of Enabler.js in a folder called "offline". (This option is only present if you choose to build a DoubleClick banner.)

Both of these prompts for offline use default to "yes". The downloaded code is _not_ referenced in the HTML though. You will need to **manually update** the HTML to load them. I've included the download of these files because I sometimes find that I need to work on these projects when having a stable Internet connection isn't possible. Having the files downloaded into my project is a failsafe for those situations.

### Roadmap

Below are some goal posts for the future of this workflow.

1. I plan on adding an option to inline the CSS and JS into the main `index.html` file.

### Tips

Be sure to check out the `gulp check` command. If you make resizes by duplicating a banner’s folder the metadata ad.size value is easy to overlook and this will help you catch that error. That's what prompted the creation of that command.

### But it doesn't work

Be sure you have the latest Gulp command line interface installed. See the [gulp-cli homepage](https://github.com/gulpjs/gulp-cli).

`npm install gulp-cli -g`

You may also need to update your Yeoman installation as well.

## License

MIT
