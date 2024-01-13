const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

let server;
mongoose.connect(config.mongoose.url).then(() => {
  server = app.listen(config.port, () => {});
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = () => {
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});
