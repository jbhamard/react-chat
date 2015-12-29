import React from 'react'
import { Link } from 'react-router'


class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>ReactChat</h1>
        <ul>
          <li><Link to="/connect">Connect</Link></li>
          <li><Link to="/chat-room">Chat room</Link></li>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { Chat }
