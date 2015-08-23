// JavaScript Document
// HTML5 Ad Template JS from DoubleClick by Google // modified to remove DCS specific code

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier
var container;
var content;
var bgExit;

var bar, hd1, hd2, hd3, cta;

//Function to run with any animations starting on load, or bringing in images etc
bannerInit = function(){

    //Assign All the elements to the element on the page
    container = document.getElementById('container_ad');
    content = document.getElementById('content_ad');
    bgExit = document.getElementById('background_exit_ad');
    bar = document.getElementById('bar');
    hd1 = document.getElementById('hd1');
    hd2 = document.getElementById('hd2');
    hd3 = document.getElementById('hd3');
    cta = document.getElementById('cta');

    //Show Ad
    container.style.display = "block";


    anim();
}

anim = function(){
    console.log('animating');
    var backSpeed = 1.2;
    var tl = new TimelineLite();

    tl.to(hd1, 0.25, {
        css: {
            left: "52px"
        },
        delay: 0.2,
        ease: Back.easeOut.config(backSpeed)
    }, '-=0.25');


    tl.play();
}
