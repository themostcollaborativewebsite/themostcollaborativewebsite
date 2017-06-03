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

app.get("/ai", function (req, res) {
  res.sendFile(__dirname + '/views/ai.html');
});

app.post("/ai/nonsense", function (req, res){
  if (req.body.sentence){
    console.log("Nonsense!: " + req.body.sentence);
    res.status(200);
    res.send("OK");
    var wordArray = sentenceToArray(req.body.sentence);
    vote(wordArray, -1);
  } else {
    res.status(400);
    res.send("No sentence");
  }
});

app.post("/ai/sense", function (req, res){
    if (req.body.sentence){
    console.log("Sense!: " + req.body.sentence);
    res.status(200);
    res.send("OK");
    var wordArray = sentenceToArray(req.body.sentence);
    vote(wordArray, 1);
  } else {
    res.status(400);
    res.send("No sentence");
  }
});

function sentenceToArray(sentence){
  var sentenceArray = sentence.split(/(\s+)/);
  return sentenceArray.filter(function(e) { return e !== ' ' });
}



// This isn't working because the last pair gets sent every time, forget how to fix for now
function vote(wordArray, direction){
  var index = 0;
  (function votePair(wordArray, direction, i){
    jsonfile.readFile(__dirname + "/data/ai.json", function(err, obj) {
      if (obj.words[wordArray[i]]){
        if (obj.words[wordArray[i]][wordArray[i + 1]]){
          obj.words[wordArray[i]][wordArray[i + 1]] += direction;
        } else {
          obj.words[wordArray[i]][wordArray[i + 1]] = direction;
        }
      } else {
        obj.words[wordArray[i]] = {};
        obj.words[wordArray[i]][wordArray[i + 1]] = direction;
      }
      if (obj.words[wordArray[i]][wordArray[i + 1]] < 0){
        obj.words[wordArray[i]][wordArray[i + 1]] = 0;
      }
      console.log(obj);
      jsonfile.writeFile(__dirname + "/data/ai.json", obj, function(err) {
        if (err){
          //throw err;
          console.log("JSON write error");
        } else {
          console.log("JSON write success");
          i += 1;
          if (i < wordArray.length - 1){
            votePair(wordArray, direction, i);
          }
        }
      });
    });
  })(wordArray, direction, index);
}

app.get("/data/ai", function (req, res) {
  res.sendFile(__dirname + "/data/ai.json");
});



// listen for requests :)
server.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + server.address().port)
})
