require('dotenv').config();
const Server = require('./models/server');

/**
 * run object server
 * @type {Server}
 */
const server = new Server();

server.listen();