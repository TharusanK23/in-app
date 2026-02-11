const express = require('express');
const controller = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/verify', controller.verifySubscription);

module.exports = router;
