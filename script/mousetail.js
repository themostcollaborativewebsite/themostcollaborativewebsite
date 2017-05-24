var debounce = require('./debounce');

module.exports = function(elem) {
  randomizeEmoji(elem);
  document.addEventListener("mousemove", debounce(function (event) {
    elem.style.display = "block";
    elem.style.top = event.clientY + 14 + "px";
    elem.style.left = event.clientX + 8 + "px";
  }, 5));
  document.addEventListener("click", function (event) {
    // option + click anywhere to get a new random emoji
    if (event.altKey) {
      randomizeEmoji(elem);
    }
  });
}

function randomizeEmoji(elem) {
  var emoji = ["🎏", "💃", "⚡️", "🚀", "🚧", "💞", "📈", "🤖", "🌟", "🌈", "🔥", "🚜", "🔧", "👻"];
  var rand = Math.floor(Math.random() * emoji.length); 
  elem.innerText = emoji[rand];
}