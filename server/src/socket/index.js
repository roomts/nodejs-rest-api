const functions = require('./functions')

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('disconnect', function () {
      io.emit('disconnect')
    })
    socket.on('auth', async function (email) {
      let data = await functions.userData(socket, email)
      io.local.emit('auth', data)
    })
  })
}
