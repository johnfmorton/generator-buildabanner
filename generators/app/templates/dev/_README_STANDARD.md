# Standard Build A Banner Instructions

You've installed the standard banner version of *Build A Banner*.

## Getting started

Begin development by typing "**gulp**" into your command line. This should spin up a server and serve the contents of your 'dev' directory.

If you use Sublime Text, open the mybanner.sublime-project file and you can quickly begin editing your banner in the "Banner dev" folder in the left hand column of Sublime Text project. 

As you make changes to the *index.html*, *script.js* and *style.scss* files, your browser will update and show you the changes you've made. The SCSS file is converted to CSS on the fly. Do **not** edit the CSS file directly because it will be overwritten.

## The backup image

Backup images are typically required for standard banners but are not delivered inside the ZIP file that makes up the HTML banner. The exception is if you place a backup image in your noscript tag. This seems like a waste of your limited K weight when it comes to standard banners but some clients request it.

The *Build A Banner* workflow can assit in preparing a backup image for delivery. Make an **optimized** backup image for your banner and store it in the 'backupImages' directory found along side the 'dev' directory. (*Build A Banner* will not optimize the image for you.) You can have *only one* image in the backup directory. You can have *only one* image in the backup directory.The name of your backup image can be anything you want as long as the extension is correct. For example, you can simply name it 'backup.gif' or 'backup.jpg'. The *Build A Banner* workflow will rename your backup image properly when it builds out your banner for delivery. 

## Building files for delivery

When you're ready to ready to build out your banner to show your client or deliver it to a media company, you use the "**gulp build**" command. This will take the contents of your 'dev' directory and minify each file. The 'dist' folder will then contain these minified files. You can upload these to a preview server to share with a client. In the 'delivery' you will also find these files zipped and ready to delivery. If you've included the backup image, it will renamed appropriately and be sitting next to the zip file. 

## Archiving a banner

After your banner is delivered, you can make an archive of your project with the "**gulp archive**" command. This will create a ZIP file in an *archive* directory within your project structure. The archive-myproject.zip file will contain the files you would need to recreate the banner again in the future. You only need to keep only this ZIP file in our project archives which will save storage space. 

To recreate the full project, unzip this archive file and type 'npm init' and a full working *Build a Banner* project will be recreated. 

Happy building.

