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
    url: `${checkEnv('MONGODB_URL')}`,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: checkEnv('JWT_SECRET'),
    accessExpirationMinutes: checkEnv('JWT_EXP_MINUTES'),
    refreshExpirationDays: checkEnv('JWT_EXP_DAYS'),
  },
  redis: {
    host: checkEnv('REDIS_HOST'),
    port: checkEnv('REDIS_PORT'),
    password: checkEnv('REDIS_PASSWORD'),
  },
};
