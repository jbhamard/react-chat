var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

// app.use('/static/templates', express.static('./app/templates'));
// app.use('/app', express.static('./app'));
app.use(express.static('public'))
  // app.use('/static/vendor', express.static('./app/vendor'));

/*
  GLOBAL VARIABLES
*/
// var USERS = []
var MESSAGES = []

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html')
})

// API
// app.get('/api/users/register', function(req, res) {
//   if (MESSAGES.includes(req.query.q))
//     res.send(false)
//   else {
//     MESSAGES.push(req.query.q)
//     res.send(true)
//   }
// })


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
    console.log(m);
    MESSAGES.push(m)
    io.emit('message', m)
  })
})

http.listen(3000, function() {
  console.log('listen on *:3000')
})