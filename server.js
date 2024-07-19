#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./src/app')
const debug = require('debug')('back:server')
const https = require('https')
const http = require('http')
const path = require('path')
const fs = require ('fs')
const logger = require("./src/utils/logger")(module);

/**
  * Get port from environment and store in Express.
  */

const port = normalizePort(process.env.API_PORT)
app.set('port', port)

let server
if (process.env.SSL && process.env.SSL == 1){
  const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
    requestCert: true,
    rejectUnauthorized: false
  };
  console.log('creating https server')
  server = https.createServer(options, app)
}
else {
  console.log('creating http server')
  server = http.createServer(app)
}
/**
  * Listen on provided port, on all network interfaces.
  */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.log('HTTP server closed')
  })
})

// Uncaught Exception
process.on("uncaughtException", (error, origin) => {
  logger.error("Uncaught exception", error.message);
  logger.error(error);
  logger.error(origin);
});

// Uncaught Exception
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled promise rejection");
  logger.error(reason);
  logger.error(promise);
});

/**
  * Normalize a port into a number, string, or false.
  */

function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
  * Event listener for HTTP server "error" event.
  */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
  * Event listener for HTTP server "listening" event.
  */

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.info(`Server started on port ${bind}`)
}
