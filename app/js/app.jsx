import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { Chat } from './chat.jsx'
import { ConnectToChatRoom } from './connect-to-chatroom.jsx'
import { ChatRoom } from './chat-room.jsx'

const history = createBrowserHistory()

const routes = {
  path: '/',
  component: Chat,
  indexRoute : {
    component : ConnectToChatRoom
  },
  childRoutes: [{
    path: 'chat-room',
    component: ChatRoom
  }]
}

render(<Router history={history} routes={routes} />, document.getElementById('app'))