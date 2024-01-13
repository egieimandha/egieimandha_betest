const { User } = require('../models');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  return User.create(userBody);
};

const queryUsers = async () => {
  const users = await User.find({});
  return users;
};

module.exports = {
  createUser,
  queryUsers,
};
