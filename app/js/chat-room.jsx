import socket from './services/socket'
import React from 'react'
import { render } from 'react-dom'

let MESSAGES = []

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="message">{this.props.data}</li>
    )
  }
}


class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: MESSAGES
    }
  }

  //listen for messages
  componentDidMount = () => {
    socket.connect()
    socket.onMessage((m)=>{
      MESSAGES.push(m)
      this.setState({
        messages:MESSAGES
      })
    })
  }

  render() {
    return (
      <ul className="messages">
        {this.state.messages.map((m,i) => {
          return <Message data={m.text} className={i%2 === 0 ? 'even' : 'odd'} key={m.id}/>
        })}
      </ul>
    )
  }
}


class MessageBar extends React.Component {
  constructor() {
    super()
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
    socket.send(this.state.message)
    this.setState({
      message:''
    })
  }

  render() {
    return (
      <div>
        <p>enter a message</p>
        <form className="input-group" onSubmit={this.handleSubmit}>
          <input  type="text" 
                  className="form-control" 
                  name="message" 
                  value={this.state.message} 
                  placeholder="your message" 
                  onChange={this.handleMessageChange}/>
          <input type="submit" value="Enter" className="btn btn-primary"/>
        </form>
      </div>
    )
  }
}


class ChatRoom extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="well">
        <Messages/>
        <MessageBar/>
      </div>
    )
  }
}


export { ChatRoom }