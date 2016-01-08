var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var http = require('http').Server(app)
var io = require('socket.io')(http)
var _ = require('lodash')
var User = require('./app/backend/user')

app.use(express.static('public'))
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html')
})

var MESSAGES = [];
var CLIENTS = {};

// registration API
app.post('/api/users/register', function(req, res) {
  var u;
  try {
    u = new User({
      nickName: req.body.nickName
    })
    res.json({
      user: u
    })
  } catch (e) {
    res.status(422).json({
      error: e
    })
  }
})

// socket
io.on('connection', function(socket) {

  socket.on('userConnected', function(user) {
    var clientUser = _.merge(user, {
      time: new Date()
    })
    console.log('connection')
    console.log(clientUser)
    CLIENTS[this.id] = clientUser
    io.emit('userConnected', clientUser)
  })

  socket.on('disconnect', function() {
    var u = CLIENTS[this.id]
    console.log('disconnection')
    console.log(u)
    io.emit('userDisconnected', {
      user: u.user,
      time: new Date()
    })

    CLIENTS[this.id] = null
  })

  socket.on('message', function(msg) {
    var m = {
      text: msg.text,
      id: MESSAGES.length + 1,
      user: msg.user,
      time: new Date()
    }
    MESSAGES.push(m)
    io.emit('message', m)
  })

})

http.listen(3000, function() {
  console.log('WiChat server listening on *:3000')
})