const express = require('express');
const authRoute = require('./auth.route');

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello world');
});
const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
