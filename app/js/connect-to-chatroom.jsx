import connection from './services/connection'
import React from 'react'
import { render } from 'react-dom'

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nickName: '',
      acceptedNickName : '',
      error : ''
    }
  }

  handleNicknameChange = (e) => {
    this.setState({
      nickName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    connection
      .register(this.state.nickName)
      .then((user) => {
        this.setState({
          nickName : '',
          error: ''
        })
        this.props.history.pushState({ user: user },'/chat-room')
      })
      .catch((error) => {
        this.setState({
          acceptedNickName: '',
          nickName : '',
          error: error
        })
      })
  }

  render() {
    return (
      <div>
        <p>{this.state.error}</p>
        <form className="input-group" onSubmit={this.handleSubmit}>
          <input  className="form-control" type="text" value={this.state.nickName}
                  name="nickname" onChange={this.handleNicknameChange} placeholder="your nickname"/>
          <input  className="btn btn-primary" type="submit" value="connect"/>
        </form>
      </div>
    )
  }
}

class ConnectToChatRoom extends React.Component {
  render() {
    return (
      <div className="well">
        <p>Pick your nickname, and connect</p>
        <ConnectionForm history={this.props.history}/>
      </div>
    )
  }
}

export { ConnectToChatRoom }