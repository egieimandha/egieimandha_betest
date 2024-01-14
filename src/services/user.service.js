const { setRedist, getRedist } = require('../config/redis');
const { User } = require('../models');

async function getAccountNumber() {
  const accountNumber = `2222${Math.floor(Math.random() * 90000000) + 10000000}`;

  try {
    const acct = await User.findOne({ accountNumber });
    return acct ? await getAccountNumber() : accountNumber;
  } catch (e) {
    throw new Error('Some think wrong');
  }
}

const validateUserData = async (userBodyParam) => {
  if (await User.isEmailTaken(userBodyParam.emailAddress)) {
    throw new Error('Email already taken');
  }
  if (await User.isUserNameTaken(userBodyParam.userName)) {
    throw new Error('Username already taken');
  }
  if (await User.isDuplicateIdentitiyNumber(userBodyParam.identityNumber)) {
    throw new Error('Identity number already exist');
  }
};

const createUser = async (userBodyParam) => {
  await validateUserData(userBodyParam);
  const accountNumber = await getAccountNumber();
  const userBody = {
    accountNumber,
    ...userBodyParam,
  };
  return User.create(userBody);
};

const queryUsers = async (limit = 10, page = 1) => {
  const cacheKey = `redis_egieimandha_betest`;
  const cachedData = await getRedist(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const totalDatas = await User.countDocuments({});
  const users = await User.find({})
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

  const result = {
    users,
    meta: {
      page,
      totalPages: Math.ceil(totalDatas / limit) || 0,
      totalDatas,
    },
  };

  await setRedist(cacheKey, JSON.stringify(result), 3600);

  return result;
};

const getUserByEmail = async (email) => {
  return User.findOne({ emailAddress: email });
};

const getUserByAccountNumber = async (accountNumber) => {
  const cacheKey = `redis_egieimandha_${accountNumber}_betest`;
  const cachedData = await getRedist(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const user = await User.findOne({ accountNumber }).lean();
  if (!user) {
    throw new Error('User Not Found');
  }

  await setRedist(cacheKey, JSON.stringify(user), 3600);

  return user;
};

const getUserByIdentityNumber = async (identityNumber) => {
  const cacheKey = `redis_egieimandha_${identityNumber}_betest`;
  const cachedData = await getRedist(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const user = await User.findOne({ identityNumber });
  if (!user) {
    throw new Error('User Not Found');
  }

  await setRedist(cacheKey, JSON.stringify(user), 3600);

  return user;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }
  await validateUserData(updateBody);

  // need to delete body bc user can update accountNumber
  // bc it will have chance accountNumber to be duplicate
  if (updateBody.accountNumber) {
    // eslint-disable-next-line no-param-reassign
    delete updateBody.accountNumber;
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  await user.deleteOne();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserByEmail,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  updateUserById,
  deleteUserById,
};
