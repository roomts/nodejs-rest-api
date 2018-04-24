const {User} = require('../models')
const {jwt} = require('../controllers/user')
const config = require('../config/config')

async function validate (socket) {
  try {
    await jwt.verify(socket.handshake.query.token, config.authentication.jwtSecret, null)
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  async userData (socket, email) {
    try {
      if (validate(socket)) {
        const user = await User.findOne({
          where: {
            email: email
          }
        })
        return user
      } else {
        return 'false'
      }
    } catch (error) {
      return error
    }
  }
}
