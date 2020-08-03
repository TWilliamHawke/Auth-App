const socketIo = require('socket.io')
const { sendMessage, getOldMessages, deleteMessage } = require('./controllers/socketControllers')

let io


module.exports = {
  ioInit: server => {
    io = socketIo(server)
    io.on("connection", async (socket) => {
      console.log('client connected')
      socket.on("sendMessage", async data => await sendMessage(io, data))
      socket.on(
        'getOldMessages',
        async data => await getOldMessages(socket, data)
      )
      socket.on('deleteMessage', async id => await deleteMessage(io, id))
    })
    return io
  },
  getIo: () => {
    if(!io) throw new Error('Socket does not init')
    return io
  }
}