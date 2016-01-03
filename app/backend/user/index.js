var _ = require('lodash')

var USERS = []

function User(config) {
  console.log(USERS)
  console.log(config)
  if (!config.nickName) {
    throw ('nickname_is_mandatory')
  }

  if (_.find(USERS, 'nickName', config.nickName)) {
    throw ('unavailable_nickname')
  }

  this.nickName = config.nickName
  this.id = USERS.length + 1
  USERS.push(this)
}


module.exports = User