var k97 = false; // a
var k119 = false; // w
var k100 = false; // d
var k115 = false; // s


$(document).keypress(function( event ) {
  event.preventDefault();
  console.log("key: " + event.which);
  if ( event.which == 100 ) {   
    k100 = true;
    k97 = false;
    move("k100", "left", plus, gt);
  }
  if ( event.which == 97 ) {
    k97 = true;
    k100 = false;
    move("k97", "left", minus, lt);
  }
  if ( event.which == 115 ) {
    k115 = true;
    k119 = false;
    move("k115", "top", plus, gt);
  }
  if ( event.which == 119 ) {
    k119 = true;
    k115 = false;
    move("k119", "top", minus, lt);
  }
});

function move(key, axis, direction, limit) {
  console.log("Move: " + axis  + " " + direction);
  if (isKey(key)){
    var player = $( "#game-player" );
    var pos = player.css(axis);
    var posInt = parseInt(pos.substring(0, pos.indexOf("p")));
    player.css(axis, direction(posInt));
    if (limit(posInt)){
      // Not sure how else to do this, I'm sure there's a better way
      isKey(key) = false;
    }
    setTimeout(function() {
      move(key, axis, direction, limit);
    }, 20);
  }
}

function isKey(key){
  if (key === "k100"){
    return k100;
  }
  if (key === "k97"){
    return k97;
  }
  if (key === "k115"){
    return k115;
  }
  if (key === "k119"){
    return k119;
  }
}

function plus(pos){
  return pos + 1;
}

function minus(pos){
  return pos - 1;
}

function gt(pos){
  return pos > 499;
}

function lt(pos){
  return pos < 6;
}