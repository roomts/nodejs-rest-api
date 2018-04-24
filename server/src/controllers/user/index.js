const {User} = require('../../models')
const functions = require('./functions')

module.exports.AuthenticationController = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 403
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 403
        })
      }

      if (user.otpbase32) {
        if (!functions.validateOtp(user.otpbase32, req.body.token)) {
          return res.status(403).send({
            error: 403
          })
        }
      }

      const userJson = {id: user.id}
      res.send({
        user: user,
        token: functions.jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in' + err.message
      })
    }
  },
  async getOne (req, res) {
    try {
      const user = req.user
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async getAll (req, res) {
    try {
      const users = await User.findAll()
      if (!users) {
        return res.status(403).send({
          error: 'The user doesn\'t exist!'
        })
      }
      res.send({
        users: users
      })
    } catch (err) {
      res.status(500).send({
        error: err.message
      })
    }
  },
  async updateUser (req, res) {
    try {
      const user = req.user
      if (user.permission === 1) {
        req.body.permission = 2
      }
      user.update({
        cpf: req.body.cpf,
        name: req.body.name,
        phone: req.body.phone,
        permission: req.body.permission,
        birth_date: req.body.birth_date
      })

      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured, please contact the admins!' + error.message
      })
    }
  },
  async deactivateUser (req, res) {
    try {
      const user = req.user
      user.update({
        permission: 0
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured, please contact the admins!' + error.message
      })
    }
  },
  generateOTP (req, res) {
    const result = functions.generateOTP()
    res.send(result)
  },
  async confirmOTP (req, res) {
    try {
      if (functions.validateOtp(req.body.secret, req.body.token)) {
        const user = req.user
        user.update({
          otpbase32: req.body.secret
        })
        res.send('OTP setted')
      }
    } catch (error) {
      res.send(error.message)
    }
  },
  async cancelOTP (req, res) {
    try {
      if (functions.validateOtp(req.body.secret, req.body.token)) {
        const user = req.user
        user.update({
          otpbase32: null
        })
        res.send('OTP setted')
      }
    } catch (error) {
      res.send(error.message)
    }
  }
}

module.exports.jwt = functions.jwt
