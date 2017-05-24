// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var exampleModule = require('./example-module');
exampleModule();
var setUpMouseTail = require('./mousetail');
var tail = document.getElementById("tail");
setUpMouseTail(tail);

// hack to make the chat js only load on chat pages
// is there a better way to do this? er, I mean there's GOTTA be a better way to do this. Any ideas?
if (window.location.href.indexOf("chat") != -1) {
  var chat = require('./chat');
  chat(); 
}


var axios = require('axios');


var glitchProjectName = window.location.hostname.split('.').shift();
var glitchApiDomain = "https://api.glitch.com";

// var wormhole = document.getElementById("wormhole");
// wormhole.src = "https://glitch.com/edit/#!/" + glitchProjectName;

// shall we get a little meta up in here?
axios.get(glitchApiDomain + "/projects/" + glitchProjectName).then(function (response) {
  window._data = response.data;
  console.log(_data);
});

$( document ).ready(function() {
    
  console.log("mic check one two");
});
