# DoubleClick Studio Build A Banner Instructions

You've installed the DoubleClick Studio version of *Build A Banner*.
 
## Getting started

Begin development by typing "**gulp**" into your command line. This should spin up a server and serve the contents of your 'dev' directory.

If you use Sublime Text, open the mybanner.sublime-project file and you can quickly begin editing your banner in the "Banner dev" folder in the left hand column of Sublime Text project. 

As you make changes to the index.html, script.js and style.scss files, your browser will update and show you the changes you've made. The scss file is converted to CSS on the fly.

## The backup image

Backup images are typically required for DoubleClick Studio banners.

The *Build A Banner* workflow can assit in preparing a backup image for delivery. Make an **optimized** backup image for your banner and store it in the 'backupImages' directory you find along side your 'dev' directory. (*Build A Banner* will not optimize the image for you.) If a gif, jpg, or png file in that directory, the image will be renamed based on the name you've given the banner and it will be place alongside the zip file in the delivery folder. 

## Building files for delivery

When you're ready to ready to build out your banner to show your client or deliver it to a media company, you use the "**gulp build**" command. This will take the contents of your 'dev' directory and minify each file. The 'dist' folder will then contain these minified files. You can upload these to a preview server to share with a client. In the 'delivery' you will also find these files zipped and ready to upload into DoubleClick Studio. If you've included the backup image, it will renamed appropriately and be sitting next to the zip file. It will contain word 'backup' in the filename and DoubleClick Studio should recognize it as the backup image automatically in most cases.

Happy building.