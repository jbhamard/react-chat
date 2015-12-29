import io from 'socket.io-client'

let s

let socket = {
  connect: () => {
    s = io()
  },
  send: (msg) => {
    s.emit('message', {
      text: msg
    })
  },
  onMessage: (callback) => {
    s.on('message', callback)
  }
}

export default socket