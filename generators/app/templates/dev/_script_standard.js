// JavaScript Document
// HTML5 Ad Template JS from DoubleClick by Google // modified to remove DCS specific code

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier
// var container;
// var content;
// var bgExit;

var removeMeBABExample;

//Function to run with any animations starting on load, or bringing in images etc
function bannerInit(){
    // adds class "loaded" to the body
    // document.getElementsByTagName('body')[0].className+=' loaded';

    // Assign all the elements to the element on the page
    // container = document.getElementById('container_ad');
    // content = document.getElementById('content_ad');
    // bgExit = document.getElementById('background_exit_ad');
    removeMeBABExample = document.getElementById('remove-me');

    // Show Ad (this can also be done in the index.html
    // which it is in the default template.)
    //
    // container.style.display = "block";

    anim();
}

function anim(){
    console.log('animating');

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
