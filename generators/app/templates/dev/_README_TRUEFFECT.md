# TruEffect Build A Banner Instructions

You've installed the TruEffect version of *Build A Banner*.

## Getting started

Begin development by typing "**gulp**" into your command line. This should spin up a server and serve the contents of your 'dev' directory.

If you use Sublime Text, open the mybanner.sublime-project file and you can quickly begin editing your banner in the "Banner dev" folder in the left hand column of Sublime Text project. 

As you make changes to the *index.html*, *script.js* and *style.scss* files, your browser will update and show you the changes you've made. The SCSS file is converted to CSS on the fly. Do **not** edit the CSS file directly because it will be overwritten.

## The backup image

TruEffect has a unique requirement for delivery of banners. Specifically they require a backup image be included in the ZIP file and this backup image needs to have the same base filename as the ZIP file it is contained within.

The *Build A Banner* workflow can assit in preparing a backup image for delivery. Make an **optimized** backup image for your banner and store it in the 'backupImages' directory found along side the 'dev' directory. (*Build A Banner* will not optimize the image for you.) You can have *only one* image in the backup directory. You can have *only one* image in the backup directory.The name of your backup image can be anything you want as long as the extension is correct. For example, you can simply name it 'backup.gif' or 'backup.jpg'. The *Build A Banner* workflow will rename your backup image properly when it builds out your banner for delivery. 

## Building files for delivery

When you're ready to ready to build out your banner to show your client or deliver it to a media company, you use the "**gulp build**" command. This will take the contents of your 'dev' directory and minify each file. Since TruEffect requires the name of your primary html file to be *frame.html* the *index.html* file in the 'dev' directory will be renamed automatically during the minification process. 

The 'dist' folder will then contain the minified files along with your properly renamed backup image as described earlier. In the 'delivery' you will also find these files zipped and ready to delivery. 

Unlike other media spec requirements, the name of the files is very specific with TruEffect. If you need a different name for the archive file, you should rename it in the *gulpfile.js* file and rebuild your project. Look for the line at the top of this file where the variable *archiveName* is defined.

## Archiving a banner

After your banner is delivered, you can make an archive of your project with the "**gulp archive**" command. This will create a ZIP file in an *archive* directory within your project structure. The archive-myproject.zip file will contain the files you would need to recreate the banner again in the future. You only need to keep only this ZIP file in our project archives which will save storage space. 

To recreate the full project, unzip this archive file and type 'npm init' and a full working *Build a Banner* project will be recreated. 

Happy building.