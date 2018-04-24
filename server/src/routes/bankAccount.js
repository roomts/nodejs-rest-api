var express = require('express')
var router = express.Router()
const BankAccountController = require('../controllers/account/')
const AuthenticatedPolicy = require('../policies/isAuthenticated')

router.post('/create', AuthenticatedPolicy, BankAccountController.newBankAccount)
router.post('/update', AuthenticatedPolicy, BankAccountController.updateBankAccount)
router.post('/deactivate', AuthenticatedPolicy, BankAccountController.deactivateBankAccount)
router.post('/get', AuthenticatedPolicy, BankAccountController.getBankAccount)
router.post('/get/all', AuthenticatedPolicy, BankAccountController.getUserBankAccounts)

module.exports = router
