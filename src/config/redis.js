const Redis = require('ioredis');
const config = require('.');

const redis = new Redis(config.redis);

const setRedist = (key, value, ttl) => {
  if (ttl) {
    return redis.set(key, value, 'EX', ttl);
  }
  return redis.set(key, value);
};

const getRedist = (key) => {
  return redis.get(key);
};

const deleteRedist = (key) => {
  return redis.del(key);
};

module.exports = {
  setRedist,
  getRedist,
  deleteRedist,
};
