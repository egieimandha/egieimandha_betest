const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const checkEnv = (envVar, defaultValue) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable "${envVar}"`);
  } else {
    return process.env[envVar];
  }
};

module.exports = {
  port: checkEnv('PORT'),
  mongoose: {
    url: `${checkEnv('MONGODB_URL')}/${checkEnv('DATABASE')}`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: 'jwtsecret',
    accessExpirationMinutes: 30,
    refreshExpirationDays: 30,
  },
};
