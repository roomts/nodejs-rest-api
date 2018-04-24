const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  path: '/back',
  cookie: false,
  pingInterval: 10000,
  pingTimeout: 2000
})

// app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport/passport')
require('./socket/')(io)
app.use('/user/', require('./routes/user'))
app.use('/bankacc/', require('./routes/bankAccount'))

// reseta o banco = true
sequelize.sync({force: true})
  .then(() => {
    server.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
