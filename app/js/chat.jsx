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
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { Chat }
