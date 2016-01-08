import React from 'react'

class UserEvent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className={this.props.className}>{this.props.time.toString()}  -  {this.props.text}</li>
    )
  }
}

export { UserEvent }