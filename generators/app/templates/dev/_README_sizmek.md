# Standard Sizmek Build A Banner Instructions

You've installed the standard Sizmek banner version of *Build A Banner*.

## Getting started

Begin development by typing "**gulp**" into your command line. This should spin up a server and serve the contents of your 'dev' directory.

If you use Sublime Text, open the mybanner.sublime-project file and you can quickly begin editing your banner in the "Banner dev" folder in the left hand column of Sublime Text project. 

As you make changes to the *index.html*, *script.js* and *style.scss* files, your browser will update and show you the changes you've made. The SCSS file is converted to CSS on the fly. Do **not** edit the CSS file directly because it will be overwritten.

## Sizmek

Sizmek has a number of ways to build ads. When hand-coding a banner like you do in Build-a-banner, Sizmek refers to this as a "workspace" banner.

https://support.sizmek.com/hc/en-us/articles/200722459-HTML5-Workspaces

You may also need a `config.js` file for your ad. At the time I write this, it is not clear if this is a requirement or a nice-to-have. Build-a-banner does not create this file for you. Depending on what we discover, it may at some point in the future.

Here is a link to the documentation on the topic:

https://support.sizmek.com/hc/en-us/articles/208878026-Add-Manifest-Ad-Data-to-Your-Workspace-Config-js-File

For the clickthru in Sizmek banners, you use the `adkit` Object, which has a listener for when it is ready. 

```
adkit.onReady(function(){
        // use api
        /* default clickthrough */ 
    	adkit.clickthrough();
   });
```

Here are 2 link with more details on this topic.

https://support.sizmek.com/hc/en-us/articles/206584783-Sizmek-AdKit-API
https://support.sizmek.com/hc/en-us/articles/115004544966-AdKit-Clickthrough-Method

The Build-a-Banner template just created should cover the basics of a clickthru event already. 

## The backup image

The *Build A Banner* workflow can assit in preparing a backup image for delivery. Make an **optimized** backup image for your banner and store it in the 'backupImages' directory found along side the 'dev' directory. (*Build A Banner* will not optimize the image for you.) You can have *only one* image in the backup directory. You can have *only one* image in the backup directory.The name of your backup image can be anything you want as long as the extension is correct. For example, you can simply name it 'backup.gif' or 'backup.jpg'. The *Build A Banner* workflow will rename your backup image properly when it builds out your banner for delivery. 

If you are providing banners to a media company to upload, you can give them the backups separately. If you are the one adding them to the Sizmek interface, you may need to add them to your Sizmek Workspace for the creative.

## Building files for delivery

When you're ready to ready to build out your banner to show your client or deliver it to a media company, you use the "**gulp build**" command. This will take the contents of your 'dev' directory and minify each file. The 'dist' folder will then contain these minified files. You can upload these to a preview server to share with a client. In the 'delivery' you will also find these files zipped and ready to delivery. If you've included the backup image, it will renamed appropriately and be sitting next to the zip file. 

## Archiving a banner

After your banner is delivered, you can make an archive of your project with the "**gulp archive**" command. This will create a ZIP file in an *archive* directory within your project structure. The archive-myproject.zip file will contain the files you would need to recreate the banner again in the future. You only need to keep only this ZIP file in our project archives which will save storage space. 

To recreate the full project, unzip this archive file and type 'npm init' and a full working *Build a Banner* project will be recreated. 

Happy building.

