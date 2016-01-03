var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app)
var io = require('socket.io')(http)
var _ = require('lodash')
var User = require('./app/backend/user')

// app.use('/static/templates', express.static('./app/templates'));
// app.use('/app', express.static('./app'));
app.use(express.static('public'))
app.use(bodyParser.json());
// app.use('/static/vendor', express.static('./app/vendor'));

/*
  GLOBAL VARIABLES
*/
var USERS = []

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html')
})

// registration API
app.post('/api/users/register', function(req, res) {
  console.log(req.body)
  var u;
  try {
    u = new User({
      nickName: req.body.nickName
    })
    res.json({
      user: u
    })
  } catch (e) {
    console.log(e)
    res.status(422).json({
      error: e
    })
  }
})


// socket
io.on('connection', function(socket) {
  console.log('user connected')

  socket.on('disconnect', function() {
    console.log('user disconnected')
  })

  socket.on('message', function(msg) {
    var m = {
      text: msg.text,
      id: MESSAGES.length + 1
    }
    io.emit('message', m)
  })
})

http.listen(3000, function() {
  console.log('ReactChat server listening on *:3000')
})