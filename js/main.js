"use strict";


document.getElementById('nameForm').onsubmit = function () { // https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript

    var body = document.getElementsByTagName("body")[0];
    var h1 = document.getElementById('h1');

    // Remove overlay when animation is complete
    setTimeout(function () {
        body.setAttribute('class', '');
    }, 2000);

    // Update h1 with the name user entered
    h1.textContent = h1.textContent.replace('{{name}}', document.getElementById('nameTextbox').value);

    // Show vertical scroll bar when animation starts so the screen doesn't shift
    // when hidding the overlay
    body.style.overflowY = 'auto';

    // Hide the form elements
    document.getElementById('formHolder').style.display = 'none';

    // Start the CSS animation
    document.getElementById("nameOverlay").style.animationPlayState = "running";

    return false;
}
