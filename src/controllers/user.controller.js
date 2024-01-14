const httpStatus = require('http-status');
const { userService } = require('../services');

const getUsers = async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  try {
    const result = await userService.queryUsers();
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something wrong' });
  }
};

const getUserByAccountNumber = async (req, res) => {
  try {
    const result = await userService.getUserByAccountNumber(req.params.accountNumber);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something wrong' });
  }
};

const getUserByIdentityNumber = async (req, res) => {
  try {
    const result = await userService.getUserByIdentityNumber(req.params.identityNumber);
    res.send(result);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Something wrong' });
  }
};

module.exports = {
  getUsers,
  getUserByAccountNumber,
  getUserByIdentityNumber,
};
