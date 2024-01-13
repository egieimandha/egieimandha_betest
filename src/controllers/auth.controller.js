const httpStatus = require('http-status');
const { userService } = require('../services');

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
};

const login = async (req, res) => {
  res.send('bellow');
};

module.exports = {
  register,
  login,
};
