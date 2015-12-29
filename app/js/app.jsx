import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'

import { Chat } from './chat.jsx'
import { ConnectToChatRoom } from './connect-to-chatroom.jsx'
import { ChatRoom } from './chat-room.jsx'


const routes = {
  path: '/',
  component: Chat,
  childRoutes: [{
    path: 'connect',
    component: ConnectToChatRoom
  }, {
    path: 'chat-room',
    component: ChatRoom
  }]
}


render(<Router routes={routes} />, document.getElementById('app'))