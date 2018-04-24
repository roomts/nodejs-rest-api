const {BankAccount} = require('../../models')

module.exports = {
  async newBankAccount (req, res) {
    try {
      req.body.UserId = req.user.id
      const bankAccount = await BankAccount.create(req.body)
      const bankAccountJson = bankAccount.toJSON()
      res.send({
        BankAccount: bankAccountJson
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email BankAccount is already in use.' + error.message
      })
    }
  },
  async getBankAccount (req, res) {
    try {
      console.log(req)
      await BankAccount.findOne({
        where: {
          id: req.body.accountId,
          UserId: req.user.id
        }
      }).then(result => {
        console.log(result)
        const accountJson = result.toJSON()
        res.send({
          user: accountJson
        })
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email BankAccount is already in use.' + error.message
      })
    }
  },
  async getUserBankAccounts (req, res) {
    try {
      const accounts = BankAccount.getAll({
        where: {
          userID: req.user.id
        }
      })
      res.send({
        accounts: accounts
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email BankAccount is already in use.'
      })
    }
  },
  async updateBankAccount (req, res) {
    try {
      const account = BankAccount.findOne({
        where: {
          id: req.body.accountId,
          userID: req.user.id
        }
      })
      account.update({
        agency: req.body.agency,
        accountNumber: req.body.accountNumber,
        digit: req.body.digit,
        isCurrent: req.body.isCurrent
      })

      res.send({
        account: account.toJSON()
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email BankAccount is already in use.' + error.message
      })
    }
  },
  async deactivateBankAccount (req, res) {
    try {
      const account = BankAccount.findOne({
        where: {
          id: req.body.accountId,
          userID: req.user.id
        }
      })
      account.update({
        isactive: false
      })
      res.send({
        account: account
      })
    } catch (error) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  }
}
