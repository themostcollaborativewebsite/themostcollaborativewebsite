// server.js
// where your node app starts

// init project
var browserify = require('browserify-middleware')
var express = require('express')
var app = express()
var server = require('http').Server(app);
var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/js', browserify(__dirname + '/script'))

app.use(express.static('public'))

io.on('connection', (socket) => {
  socket.on('send message', data => {
    data.date = +new Date()
    console.log(data)
    socket.broadcast.emit('new message', data)
  })
});

app.get("/chat", function (req, res) {
  res.sendFile(__dirname + '/views/chat.html');
});

app.get("/chats", function (req, res) {
  res.sendFile(__dirname + "/chats.json");
});

app.post("/chat/new", function (req, res) {
  if (req.body.message){
    var message = req.body.message;
    var timeNow = new Date();
    var readTime = timeNow.getHours() + ":" + (timeNow.getMinutes()<10?'0':'') + timeNow.getMinutes() + " GMT";
    var chat = { message, timestamp: readTime, user: req.body.user };
    jsonfile.readFile(__dirname + "/chats.json", function(err, obj) {
      obj.chats.push(chat);
      jsonfile.writeFile(__dirname + "/chats.json", obj, function(err) {
          if (err){
            throw err;
          } else {
            res.status(200);
            res.send("OK");
          }
      });
    });
  } else {
    res.status(400);
    res.send("Error");
  }
});
app.get("/chat/beta", function (req, res) {
  res.sendFile(__dirname + '/views/beta-chat.html');
});

app.get("/chats-beta", function (req, res) {
  res.sendFile(__dirname + "/chats-beta.json");
});

app.post("/chat/beta/new", function (req, res) {
  if (req.body.message){
    var message = req.body.message;
    var timeNow = new Date();
    var readTime = timeNow.getHours() + ":" + (timeNow.getMinutes()<10?'0':'') + timeNow.getMinutes() + " GMT";
    var chat = { message, timestamp: readTime, user: req.body.user };
    jsonfile.readFile(__dirname + "/chats-beta.json", function(err, obj) {
      obj.chats.push(chat);
      jsonfile.writeFile(__dirname + "/chats-beta.json", obj, function(err) {
          if (err){
            throw err;
          } else {
            res.status(200);
            res.send("OK");
          }
      });
    });
  } else {
    res.status(400);
    res.send("Error");
  }
});



app.get("/game", function (req, res) {
  res.sendFile(__dirname + '/views/game.html');
});


// listen for requests :)
server.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + server.address().port)
})
