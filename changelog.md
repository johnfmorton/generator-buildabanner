# Build A Banner Yeoman Workflow

## Changelog

Version 0.10.0
* Added Sizemek support

All previous versions
* Sorry... adding a change log kinda late in the process. Will try to do better


## To do
* I'll be removing the non-blocking inclusion of the CSS file. In some cases this is messing up animations where the JS manages to load faster than the CSS. Making the CSS a blocking load seems to make the most sense because that the equivalent of "waiting for it to load" in order to run the JS. 
* I need to check the versions of the Greensock library and other JS files referenced to be sure their versions are up to date. 
