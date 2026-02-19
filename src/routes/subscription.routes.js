const express = require('express');
const controller = require('../controllers/subscription.controller');

const router = express.Router();

router.post('/verify-play', controller.verifyPlaySubscription);
router.post('/verify-apple', controller.verifyAppleSubscription);

module.exports = router;
