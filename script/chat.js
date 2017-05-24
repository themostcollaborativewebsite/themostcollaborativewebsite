// This creates a long chat in a list at /chat.


module.exports = function() {
  console.log("Chat"); 
  // Might have been the missing semi colon
  // Seems to be working now

  (function getChats() {
    setTimeout(function(){
      $.ajax({
        url: "/chats",
        success: function(data) {
          var d = Date.now();
          console.log("Got Chats " + d);
          $( "#chats" ).html("");
          for (var i in data.chats){
            var chat = data.chats[i];
            if (data.chats[i].timestamp){
              var newChat = "<li>" + chat.timestamp + " - " + chat.message + "</li>";
              $( "#chats" ).prepend(newChat);
            } else {
              var newChat = "<li>" + chat + "</li>";
              $( "#chats" ).prepend(newChat);
            }
          }
          getChats();
        },
        error: function(xhr, status, err) {
          console.log("Error:");
          console.log(err);
        }
      });
    }, 3000);
  })();

  $( "#chat-form" ).submit(function(event) {
    event.preventDefault();
    var message = $( "#chat-input").val();
    $( "#chat-input" ).val("");
    var data = { "message": message };
    $( "#chats" ).prepend("<li>" + message + "</li>");
    $.ajax({
      url: "/chat/new",
      data: data,
      success: function(data) { 
      },
      error: function(xhr, status, err) {
        console.log("Error:");
        console.log(err);
      }
    })
  });
}