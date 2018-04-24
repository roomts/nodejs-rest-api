module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define('Bank', {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    bankName: {
      type: DataTypes.STRING(128).BINARY
    },
    extendedName: {
      type: DataTypes.STRING(128).BINARY
    }
  }, {
    timestamps: false
  })

  Bank.associate = function (models) {
  }

  return Bank
}
