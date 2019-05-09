// server set-up

const http = require('http');
const app = require('./app');

const port = process.env.PORT|| 3000;  // starts listening

const server = http.createServer(app);  

// starts the server and passing PORT as an argument
server.listen(port);