const config = require('../../config/config')
const speakeasy = require('speakeasy')
const jwt = require('jsonwebtoken')

module.exports = {
  jwtSignUser (user) {
    const ONE_WEEK = 60 * 60
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  },
  generateOTP (user) {
    var { base32 } = speakeasy.generateSecret({length: 10})
    const email = 'teste@teste.com'
    const url = `otpauth://totp/JogueFacil%3A${email}?secret=${base32}&issuer=JogueFacil`
    return {
      secret: base32,
      otpauthURL: url
    }
  },
  validateOtp (secret, token) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    })
  }
}
