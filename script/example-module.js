// Want to make a module? Here's an example module you can base yours on, in case you've never done that sorta thing before.
// It gets included over in "script/client.js" with this code:
//
//   var exampleModule = require('./example-module');
//
// Browserify then takes care of turning all the stuff in client.js into a single bundle, 
// served from https://the-most-collaborative-website.glitch.me/js/client.js

module.exports = function() {
  console.log("Hi! I'm the module at 'https://glitch.com/edit/#!/the-most-collaborative-website?path=script/example-module.js:1:0'. Nice to meet ya.")
}