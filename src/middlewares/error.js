const httpStatus = require('http-status');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    if (err === httpStatus.UNAUTHORIZED) {
      statusCode = httpStatus.UNAUTHORIZED;
      message = httpStatus[httpStatus.UNAUTHORIZED];
    } else {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
  }

  res.locals.errorMessage = err.message;

  res.status(statusCode).send({ message });
};

module.exports = {
  errorHandler,
};
