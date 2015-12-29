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
      .then((res) => {
        this.setState({
          acceptedNickName: res,
          nickName : '',
          error: ''
        })
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
        <p>{this.state.acceptedNickName}</p>
        <p>{this.state.error}</p>
        <form className="input-group" onSubmit={this.handleSubmit}>
          <input  className="form-control" type="text" value={this.state.nickName}
                  name="nickname" onChange={this.handleNicknameChange}/>
          <input  className="btn btn-primary" type="submit"/>
        </form>
      </div>
    )
  }
}

class ConnectToChatRoom extends React.Component {
  render() {
    return (
      <div className="well">
        <h3>Choose your nickname</h3>
        <ConnectionForm />
      </div>
    )
  }
}

export { ConnectToChatRoom }