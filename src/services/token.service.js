const jwt = require('jsonwebtoken');
const moment = require('moment');
const { ExtractJwt } = require('passport-jwt');
const config = require('../config');
const { Token } = require('../models');

const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const decodeToken = (token) => {
  const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  return jwt.decode(token, jwtOptions);
};

const saveToken = async (token, userId, expires) => {
  await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
  });
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires);
  await saveToken(accessToken, user.id, accessTokenExpires);

  return {
    token: accessToken,
    expires: accessTokenExpires.toDate(),
  };
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, user: payload.sub });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

module.exports = {
  generateToken,
  saveToken,
  generateAuthTokens,
  verifyToken,
  decodeToken,
};
