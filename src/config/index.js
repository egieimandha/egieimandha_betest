module.exports = {
  port: 3000,
  mongoose: {
    // url: 'mongodb://127.0.0.1:27017/egieimandha-betest',
    url: 'mongodb+srv://egie_imandha:m1HfqxRwOIqG5yqs@dbtest.ixgieze.mongodb.net/egieimandha-betest?retryWrites=true&w=majority',
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
