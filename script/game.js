var k97 = false;
var k119 = false;
var k100 = false;
var k115 = false;

$(document).keypress(function( event ) {
  console.log("key: " + event.which);
  if ( event.which == 100 ) {
    event.preventDefault();
    k100 = true;
    k97 = false;
    moveRight();
  }
  if ( event.which == 97 ) {
    event.preventDefault();
    k97 = true;
    k100 = false;
    moveLeft();
  }
  if ( event.which == 115 ) {
    event.preventDefault();
    k115 = true;
    k119 = false;
    moveDown();
  }
  if ( event.which == 119 ) {
    event.preventDefault();
    k119 = true;
    k115 = false;
    moveUp();
  }
});

// Prob refactor this into a move() function 🐌


function moveRight() {
  if (k100){
    var left = $( "#game-player" ).css("left");
    var leftInt = parseInt(left.substring(0, left.indexOf("p")));
    console.log("left pos: " + leftInt);
    $( "#game-player" ).css("left", leftInt + 5);
    if (leftInt > 499){
      k100 = false;
    }
    setTimeout(function() {
      moveRight()
    }, 100);
  }  
}

function moveLeft() {
  if (k97){
    var left = $( "#game-player" ).css("left");
    var leftInt = parseInt(left.substring(0, left.indexOf("p")));
    console.log("left pos: " + leftInt);
    $( "#game-player" ).css("left", leftInt - 5);
    if (leftInt < 6){
      k97 = false;
    }
    setTimeout(function() {
      moveLeft()
    }, 100);
  }  
}

function moveDown() {
  if (k115){
    var top = $( "#game-player" ).css("top");
    var topInt = parseInt(top.substring(0, top.indexOf("p")));
    console.log("top pos: " + topInt);
    $( "#game-player" ).css("top", topInt + 5);
    if (topInt > 499){
      k115 = false;
    }
    setTimeout(function() {
      moveDown()
    }, 100);
  }  
}

function moveUp() {
  if (k119){
    var top = $( "#game-player" ).css("top");
    var topInt = parseInt(top.substring(0, top.indexOf("p")));
    console.log("top pos: " + topInt);
    $( "#game-player" ).css("top", topInt - 5);
    if (topInt < 6){
      k119 = false;
    }
    setTimeout(function() {
      moveUp()
    }, 100);
  }  
}