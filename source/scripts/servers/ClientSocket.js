var io = require('socket.io-client');
var socket = io.connect(':3000/');

module.exports = socket;