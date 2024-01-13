const express = require('express');
const passport = require('passport');
const routes = require('./routes/v1');
const { jwtStrategy } = require('./config/passport');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

module.exports = app;
