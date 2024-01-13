const httpStatus = require('http-status');
const { userService, tokenService } = require('../services');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, ...token });
  } catch (error) {
    // console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something wrong' });
  }
};

const login = async (req, res) => {
  res.send('bellow');
};

module.exports = {
  register,
  login,
};
