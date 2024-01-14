const { User } = require('../models');

async function getAccountNumber() {
  const accountNumber = `2222${Math.floor(Math.random() * 90000000) + 10000000}`;

  try {
    const acct = await User.findOne({ accountNumber });
    return acct ? await getAccountNumber() : accountNumber;
  } catch (e) {
    // console.error(e);
  }
}

const createUser = async (userBodyParam) => {
  if (await User.isEmailTaken(userBodyParam.emailAddress)) {
    throw new Error('Email already taken');
  }
  if (await User.isUserNameTaken(userBodyParam.userName)) {
    throw new Error('Username already taken');
  }
  if (await User.isDuplicateIdentitiyNumber(userBodyParam.identityNumber)) {
    throw new Error('Identity number already exist');
  }
  const accountNumber = await getAccountNumber();
  const userBody = {
    accountNumber,
    ...userBodyParam,
  };
  return User.create(userBody);
};

const queryUsers = async () => {
  const users = await User.find({});
  return users;
};

const getUserByEmail = async (email) => {
  return User.findOne({ emailAddress: email });
};

const getUserByAccountNumber = async (accountNumber) => {
  const user = await User.findOne({ accountNumber });

  if (!user) {
    throw new Error('User Not Found');
  }

  return user;
};

const getUserByIdentityNumber = async (identityNumber) => {
  const user = await User.findOne({ identityNumber });

  if (!user) {
    throw new Error('User Not Found');
  }

  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserByEmail,
  getUserByAccountNumber,
  getUserByIdentityNumber,
};
