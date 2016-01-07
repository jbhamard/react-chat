import React from 'react'
import { Link } from 'react-router'


class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="text-center">WiChat</h1>
        {this.props.children}
      </div>
    )
  }
}

export { Chat }