module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define('BankAccount', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    agency: {
      type: DataTypes.INTEGER
    },
    accountNumber: {
      type: DataTypes.INTEGER
    },
    digit: {
      type: DataTypes.TINYINT
    },
    isCurrent: {
      type: DataTypes.BOOLEAN
    }
  })

  BankAccount.associate = function (models) {
    BankAccount.belongsTo(models.User)
    BankAccount.belongsTo(models.Bank)
  }

  return BankAccount
}
