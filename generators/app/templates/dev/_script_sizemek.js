// JavaScript Document
// HTML5 Ad Template JS from DoubleClick by Google // modified to remove DCS specific code

//Declaring elements from the HTML i.e. Giving them Instance Names like in Flash - makes it easier
// var container;
// var content;
// var bgExit;

// var someElementInHTML;

//Function to run with any animations starting on load, or bringing in images etc
bannerInit = function(){
    // adds class "loaded" to the body
    // document.getElementsByTagName('body')[0].className+=' loaded';

    //Assign All the elements to the element on the page
    // container = document.getElementById('container_ad');
    // content = document.getElementById('content_ad');
    // bgExit = document.getElementById('background_exit_ad');
    // someElementInHTML = document.getElementById('some_element_in_html');

    // Show Ad (this can also be done in the index.html
    // which it is in the default template.)
    //
    // container.style.display = "block";

    anim();
}

anim = function(){
    console.log('animating');

    // Example #1
    //
    // If you're using TimelineLite, you can follow this example
    // var tl = new TimelineLite();
    // tl.to(someElementInHTML, 1, {css:{top: "100px", left: "100px"}})
    // tl.play();

    // Example #2
    //
    // If you're just doing TweenLite directly without TimelineLite
    // TweenLite.to(someElementInHTML, 1, {css:{top: "100px", left: "100px"}});
}
