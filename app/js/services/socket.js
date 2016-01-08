import io from 'socket.io-client'

let s

let socket = {
  connect: (user) => {
    s = io()

    return new Promise((resolve, reject) => {
      s.on('connect', () => {
        s.emit('userConnected', {
          user: user
        })
        resolve({
          status: 'ok'
        })
      })

      s.on('connect_error', () => {
        reject({
          message: 'connect_error'
        })
      })
    })
  },
  send: (msg, user) => {
    s.emit('message', {
      text: msg,
      user: user
    })
  },
  onMessage: (callback) => {
    s.on('message', callback)
  },
  onUserConnected: (callback) => {
    s.on('userConnected', callback)
  },
  onUserDisconnected: (callback) => {
    s.on('userDisconnected', callback)
  }
}

export default socket