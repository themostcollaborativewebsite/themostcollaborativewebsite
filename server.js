// server.js
// where your node app starts

// init project
var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var jsonfile = require('jsonfile');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use('/js', browserify(__dirname + '/script'))

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get("/chat", function (request, response) {
  response.sendFile(__dirname + '/views/chat.html');
});

app.get("/chats", function (request, response) {
  response.sendFile(__dirname + "/chats.json");
});

app.get("/chat/new", function (request, response) {
  if (request.query.message){
    var message = request.query.message;
    var timeNow = new Date();
    var readTime = timeNow.getHours() + ":" + (timeNow.getMinutes()<10?'0':'') + timeNow.getMinutes() + " GMT";
    var chat = { "message": message, "timestamp": readTime };
    jsonfile.readFile(__dirname + "/chats.json", function(err, obj) {
      obj.chats.push(chat);
      jsonfile.writeFile(__dirname + "/chats.json", obj, function(err) {
          if (err){
            throw err;
          } else {
            response.status(200);
            response.send("OK");
          }
      });
    });
  } else {
    response.status(400);
    response.send("Error");
  }
});

app.get("/chat/beta", function (request, response) {
  response.sendFile(__dirname + '/views/beta-chat.html');
});

app.get("/chats-beta", function (request, response) {
  response.sendFile(__dirname + "/chats-beta.json");
});

app.get("/chat/beta/new", function (request, response) {
  if (request.query.message){
    var message = request.query.message;
    var timeNow = new Date();
    var readTime = timeNow.getHours() + ":" + (timeNow.getMinutes()<10?'0':'') + timeNow.getMinutes() + " GMT";
    var chat = { "message": message, "timestamp": readTime };
    jsonfile.readFile(__dirname + "/chats-beta.json", function(err, obj) {
      obj.chats.push(chat);
      jsonfile.writeFile(__dirname + "/chats-beta.json", obj, function(err) {
          if (err){
            throw err;
          } else {
            response.status(200);
            response.send("OK");
          }
      });
    });
  } else {
    response.status(400);
    response.send("Error");
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
