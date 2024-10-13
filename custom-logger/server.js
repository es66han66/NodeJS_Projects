require('dotenv').config()
const net = require('net')

const logger = require('./logger')('server')

const server = net.createServer()
const port = 8000
const host = '127.0.0.1'

server.on('connection', socket => {
  logger.log('Client connected')
  socket.on('data', data => {
    const reqData = data.toString()
    logger.log(reqData)

    socket.write('res: ', reqData)
  })

  socket.on('end', () => {
    logger.log('Client disconnected')
  })

  socket.on('error', err => {
    logger.error(err.message)
  })
})

server.listen(port, host, () => {
  logger.log(`Server running at ${host}:${port}`)
})
