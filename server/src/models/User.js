const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(128).BINARY,
      unique: true,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(128).BINARY,
      unique: true,
      default: '-'
    },
    name: {
      type: DataTypes.STRING(128).BINARY
    },
    password: {
      type: DataTypes.STRING(128).BINARY,
      allowNull: false
    },
    otpbase32: {
      type: DataTypes.STRING(40).BINARY
    },
    phone: {
      type: DataTypes.STRING(128).BINARY,
      default: '-'
    },
    permission: {
      type: DataTypes.INTEGER,
      default: 1
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    from: {
      type: DataTypes.STRING(128).BINARY
    },
    createdAt: {
      type: DataTypes.DATEONLY
    }
  }, {
    hooks: {
      beforeCreate: hashPassword
      // beforeUpdate: hashPassword,
      // beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}
