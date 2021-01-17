# Google Ad Build A Banner Instructions

You've installed the Google Ad banner version of _Build A Banner_, aka BAB. This banner uses a different preloading functionality based on the IAB LEAN ad standards which has replaced the "polite load" with the concept of a "subload".

## About the IAB sub load

See [Building Light Weight And Load Optimized Ad Creatives](https://iabtechlab.com/blog/building-light-weight-and-load-optimized-ad-creatives/) from the IAM Tech Lab blog. Here's how the article begins:

> As part of the New Ad Portfolio, the concept of initial load and sub load was introduced to replace the previous “polite download”. This concept provides for the division of the total file weight into an initial load and sub load. The purpose of the initial load is to limit the file weight and requests that the creative loads while the page is loading. This enables faster page loads while allowing rendering and display of the ad creative at the time of page load.

The version of banner in this directory uses the subload function described here: https://github.com/Unitadtechnologystandards/Initial-Sub-Load

You will see the Github page describes 3 phases: initial, subload, and user initiated. The BAB baner you've just generated simplifies the preloading process by only using the subload phase.

##

This is a standard banner for use in Ad Words and DCM. If you use _Google Web Designer_, the term used there is "Google Ad" as the ad type. For clarity, BAB uses the same terminology. Media companies may also use this terminology.

The _ONLY_ difference between this and the "Non-Google Ad" ad type is the click through functionality. You can swap the click thru script and remove the "clickTag" variable definition near the top of your index.html file if you need to make a Non-Google version of this banner. Run BAB again and make a "Non-Google Ad" in a new directory then check the index.html file for a reference.

## Getting started

Begin development by typing "**gulp**" into your command line. This should spin up a server and serve the contents of your 'dev' directory.

If you use Sublime Text, open the mybanner.sublime-project file and you can quickly begin editing your banner in the "Banner dev" folder in the left hand column of Sublime Text project.

As you make changes to the _index.html_, _script.js_ and _style.scss_ files, your browser will update and show you the changes you've made. The SCSS file is converted to CSS on the fly. Do **not** edit the CSS file directly because it will be overwritten.

## The backup image

Backup images are typically required for standard banners but are not delivered inside the ZIP file that makes up the HTML banner. The exception is if you place a backup image in your noscript tag. This seems like a waste of your limited K weight when it comes to standard banners but some clients request it.

The _Build A Banner_ workflow can assit in preparing a backup image for delivery. Make an **optimized** backup image for your banner and store it in the 'backupImages' directory found along side the 'dev' directory. (_Build A Banner_ will not optimize the image for you.) You can have _only one_ image in the backup directory. You can have _only one_ image in the backup directory.The name of your backup image can be anything you want as long as the extension is correct. For example, you can simply name it 'backup.gif' or 'backup.jpg'. The _Build A Banner_ workflow will rename your backup image properly when it builds out your banner for delivery.

## Building files for delivery

When you're ready to ready to build out your banner to show your client or deliver it to a media company, you use the "**gulp build**" command. This will take the contents of your 'dev' directory and minify each file. The 'dist' folder will then contain these minified files. You can upload these to a preview server to share with a client. In the 'delivery' you will also find these files zipped and ready to delivery. If you've included the backup image, it will renamed appropriately and be sitting next to the zip file.

## Archiving a banner

After your banner is delivered, you can make an archive of your project with the "**gulp archive**" command. This will create a ZIP file in an _archive_ directory within your project structure. The archive-myproject.zip file will contain the files you would need to recreate the banner again in the future. You only need to keep only this ZIP file in our project archives which will save storage space.

To recreate the full project, unzip this archive file and type 'npm init' and a full working _Build a Banner_ project will be recreated.

Happy building.
