const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/').get(auth(), userController.getUsers);

router.route('/by-accountNumber/:accountNumber').get(auth(), userController.getUserByAccountNumber);

router.route('/by-identityNumber/:identityNumber').get(auth(), userController.getUserByIdentityNumber);

module.exports = router;
