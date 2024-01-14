const httpStatus = require('http-status');
const { userService, tokenService, authService } = require('../services');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const token = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, ...token });
  } catch (error) {
    // console.log(error);
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const token = await tokenService.generateAuthTokens(user);
    const { accountNumber, identityNumber } = user;
    res.send({
      user: {
        accountNumber,
        identityNumber,
      },
      ...token,
    });
  } catch (error) {
    // console.log(error);
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
