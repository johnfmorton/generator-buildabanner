"use strict";
// JavaScript Document
// HTML5 Ad Template JS from DoubleClick by Google

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier
// var container;
// var content;
var bgExit;

var removeMeBABExample;

//Function to run with any animations starting on load, or bringing in images etc
function bannerInit(){
    // adds class "loaded" to the body
    // document.getElementsByTagName('body')[0].className+=' loaded';

    // Assign all the elements to the element on the page
    // container = document.getElementById('container_ad');
    // content = document.getElementById('content_ad');
    bgExit = document.getElementById('background_exit_ad');
    removeMeBABExample = document.getElementById('remove-me');

    //Setup Background Image (this can be done in CSS as well
    // which it is in the default template.)
    //
    //content.style.backgroundImage = "url("+Enabler.getUrl('background.jpg')+")";

    //Bring in listeners i.e. if a user clicks or rollovers
    addListeners();

    // Show Ad (this can also be done in the index.html
    // which it is in the default template.)
    //
    // container.style.display = "block";

    anim();
}

function anim(){
    console.log('Banner animation has begun.');

    // Example #1
    //
    // If you're using TimelineLite, you can follow this example
    var tl = new TimelineLite();
    tl.to(removeMeBABExample, 0.5, {scale: 1.5})
    .to(removeMeBABExample, 0.125, {scale: 1.45})

    // Example #2
    //
    // If you're just doing TweenLite directly without TimelineLite
    // TweenLite.to(someElementInHTML, 1, {css:{top: "100px", left: "100px"}});
}

//Add Event Listeners for DoubleClick
function addListeners() {
    bgExit.addEventListener('click', bgExitHandler, false);
}

function bgExitHandler(e) {
    //Call Exits
    Enabler.exit('HTML5_Background_Clickthrough');
}