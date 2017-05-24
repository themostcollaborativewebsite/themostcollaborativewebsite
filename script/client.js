// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var exampleModule = require('./example-module');
exampleModule();
var setUpMouseTail = require('./mousetail');
var tail = document.getElementById("tail");
setUpMouseTail(tail);


var axios = require('axios');


var glitchProjectName = window.location.hostname.split('.').shift();
var glitchApiDomain = "https://api.glitch.com";

// var wormhole = document.getElementById("wormhole");
// wormhole.src = "https://glitch.com/edit/#!/" + glitchProjectName;

// shall we get a little meta up in here?
axios.get(glitchApiDomain + "/projects/" + glitchProjectName).then(function (response) {
  console.log(response.data);
});

$( document ).ready(function() {
    
  console.log("mic check one two");
});
