const httpStatus = require('http-status');
const { userService, tokenService } = require('../services');

const getUsers = async (req, res) => {
  try {
    const { limit, page } = req.query;
    let users;
    if (limit !== null && limit !== '' && page !== null && page !== '') {
      users = await userService.queryUsers(parseInt(limit, 10), parseInt(page, 10));
    } else {
      users = await userService.queryUsers();
    }
    res.send({
      data: users,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something wrong' });
  }
};

const getUserByAccountNumber = async (req, res) => {
  try {
    const result = await userService.getUserByAccountNumber(req.params.accountNumber);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const getUserByIdentityNumber = async (req, res) => {
  try {
    const result = await userService.getUserByIdentityNumber(req.params.identityNumber);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUserById(req.params.userId, req.body);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { sub } = tokenService.decodeToken(token);
    if (req.params.userId === sub) {
      res.status(httpStatus.FORBIDDEN).send({ message: 'Can not delete same user ID' });
    }
    const result = await userService.deleteUserById(req.params.userId, token);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  updateUser,
  deleteUser,
};
