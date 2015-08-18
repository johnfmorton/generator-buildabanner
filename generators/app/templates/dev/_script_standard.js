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

    tl.to(bar, 0.25, {
        css: {
            top: "199px"
        },
        delay: 0.2,
        ease: Back.easeOut.config(backSpeed)
    });
    tl.to(hd1, 0.25, {
        css: {
            left: "52px"
        },
        delay: 0.2,
        ease: Back.easeOut.config(backSpeed)
    }, '-=0.25');

    tl.to(bar, 0.25, {
        css: {
            top: "376px"
        },
        delay: 0.2,
        ease: Cubic.easeInOut
    }, "+=1.5");

    tl.set(bar, {
        rotation: 0,
        top: "90px",
        left: "-323px"
    });

    tl.to(hd1, 0.25, {
        css: {
            left: "-220px"
        },
        delay: 0.25,
        ease: Circ.easeOut
    }, '-=0.1');

    tl.to(bar, 0.25, {
        left: "23px",
        ease: Back.easeOut.config(backSpeed)
    }, "-=0.15");

    tl.to(hd2, 0.25, {
        css: {
            left: "28px"
        },
        delay: 0,
        ease: Back.easeOut.config(backSpeed)
    }, '+=0.25');

    tl.to(hd2, 0.25, {
        css: {
            left: "-300px"
        },
        delay: 0,
        ease: Circ.easeOut
    }, '+=1.5');

    tl.to(hd3, 0.25, {
        css: {
            left: "29px"
        },
        delay: 0,
        ease: Back.easeOut.config(backSpeed)
    }, '-=0.1');

    tl.to(cta, 0.25, {
        css: {
            opacity: "1"
        },
        delay: 0,
        ease: Linear.easeNone
    }, '-=0.0');

    tl.to(cta, 0.25, {
        css: {
            top: "178px"
        },
        delay: 0,
        ease: Back.easeOut.config(backSpeed)
    }, '-=0.25');

    tl.play();
}
