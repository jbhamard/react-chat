import React from 'react'
import { UserEvent } from './user-event.jsx'

class UserEvt {
  constructor(evt) {
    this.user = evt.user
    this.time = evt.time
  }

  component(i) {
    return (
      <UserEvent className={this.className} 
                 user={this.user}
                 text={this.text}
                 time={this.time}
                 key={this.prefix + '_' + this.user.id}/>
    )
  }
}

class UserConnection extends UserEvt {
  constructor(evt) {
    super(evt)
    this.prefix = 'connect_'
    this.className = 'connect'
    this.text = this.user.nickName + ' just joined.'
  }
}

class UserDisconnection extends UserEvt {
  constructor(evt) {
    super(evt)
    console.log(evt)
    this.prefix = 'disconnect_'
    this.className = 'disconnect'
    this.text = this.user.nickName + ' just left.'
  }
}


class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="message">
        <span className="nickname">{this.props.user.nickName} :: </span>
        <span className="text">{this.props.message}</span>
      </li>
    )
  }
}


class MessageEvt {
  constructor(message) {
    this.text = message.text
    this.user = message.user
    this.time = message.time
    this.messageId = message.id
  }

  component(i) {
    return (
      <Message  message={this.text} 
                time={this.time} 
                user={this.user}
                key={this.messageId}/>
    )
  }
}

let chatEvents = {
  Message: MessageEvt,
  UserConnection: UserConnection,
  UserDisconnection: UserDisconnection
}

export default chatEvents