// This creates a long chat in a list at /chat.


console.log("Chat"); 
// Might have been the missing semi colon
// Seems to be working now

(function getChats() {
  $.ajax({
    url: window.urls.getMessages,
    success: function(data) {
      var d = Date.now();
      console.log("Got Chats " + d);
      $( "#chats" ).html("");
      for (var i in data.chats){
        var chat = data.chats[i]
        var message = chat.message
        if (typeof chat === 'string') {
          message = chat
        }
        message = $('<div />').text(message).html()
        if (chat.user) {
          message = "<strong>@" + chat.user + "</strong>: " + message
        } else {
          message = "[<em>unknown</em>]: " + message
        }
        if (chat.timestamp) {
          message = chat.timestamp + " - " + message
        }
        var newChat = "<li>" + message + "</li>";
        $( "#chats" ).prepend(newChat);
      }
      setTimeout(getChats, 3000);
    },
    error: function(xhr, status, err) {
      console.log("Error:");
      console.log(err);
    }
  });
})();

if (localStorage.getItem('username' + location.path)) {
  $("#chat-user").val(localStorage.getItem('username' + location.path))
}

$( "#chat-form" ).submit(function(event) {
  event.preventDefault();
  var message = $( "#chat-input").val();
  $( "#chat-input" ).val("");
  var data = { message: message, user: $("#chat-user").val() };
  localStorage.setItem('username' + location.path, data.user);
  $( "#chats" ).prepend("<li>" + message + "</li>");
  $.ajax({
    method: 'POST',
    url: window.urls.postMessage,
    data: data,
    success: function(data) { 
    },
    error: function(xhr, status, err) {
      console.log("Error:");
      console.log(err);
    }
  });
});
