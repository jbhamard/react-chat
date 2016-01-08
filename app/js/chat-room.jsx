import socket from './services/socket'
import chatEvents from './chat-events.jsx'
import React from 'react'
import { render } from 'react-dom'

let CHAT_EVENTS = []


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// MESSAGES /////////////////////////////////////////////////////////////////////////////////////
class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatEvents: CHAT_EVENTS
    }
  }

  //connect and listen for messages
  componentDidMount = () => {
    socket
      .connect(this.props.user)
      .then((res) => {
        this.listenForMessages()
        this.listenForNewUsers()
        this.listenForLeavingUsers()
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  listenForMessages = () => {
    socket.onMessage((m) => {
      CHAT_EVENTS.push(new chatEvents.Message(m))
      this.setState({
        chatEvents: CHAT_EVENTS
      })
    })
  }

  listenForNewUsers = () => {
    socket.onUserConnected((c) => {
      CHAT_EVENTS.push(new chatEvents.UserConnection(c))
      this.setState({
        chatEvents: CHAT_EVENTS
      })
    })
  }

  listenForLeavingUsers = () => {
    socket.onUserDisconnected((c) => {
      CHAT_EVENTS.push(new chatEvents.UserDisconnection(c))
      this.setState({
        chatEvents: CHAT_EVENTS
      })
    })
  }

  render() {
    return (
      <div className="messages">  
        <ul>
          {this.state.chatEvents.map((e,i) => {
            return e.component(i)
          })}
        </ul>
      </div>
    )
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// MESSAGE-BAR /////////////////////////////////////////////////////////////////////////////////
class MessageBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  handleMessageChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    socket.send(this.state.message, this.props.user)
    this.setState({
      message:''
    })
  }

  render() {
    return (
      <div>
        <form className="form-inline text-center message-bar" onSubmit={this.handleSubmit}>
          <input  type="text" 
                  className="form-control" 
                  name="message" 
                  value={this.state.message} 
                  placeholder="your message" 
                  onChange={this.handleMessageChange}/>
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    )
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// WELCOME ///////////////////////////////////////////////////////////////////////////////////////
class  Welcome extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        Welcome {this.props.user.nickName} !
      </div>
    )
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// CHAT-ROOM /////////////////////////////////////////////////////////////////////////////////////
class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="text-center">
        <Welcome user={this.props.location.state.user}/>
        <Messages user={this.props.location.state.user}/>
        <MessageBar user={this.props.location.state.user}/>
      </div>
    )
  }
}


export { ChatRoom }