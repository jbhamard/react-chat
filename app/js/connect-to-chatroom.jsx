import connection from './services/connection'
import React from 'react'
import { render } from 'react-dom'

class ConnectToChatRoom extends React.Component {
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
        <form className="form-inline text-center" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input  className="form-control" type="text" value={this.state.nickName}
                    name="nickname" onChange={this.handleNicknameChange} placeholder="nickname"/>
          </div>
          <button className="btn btn-primary" type="submit">Connect</button>
          <p>{this.state.error}</p>
        </form>
      </div>
    )
  }
}

export { ConnectToChatRoom }