const express = require('express');
const controller = require('../controllers/webhook.controller');
const verifyOidc = require('../middleware/verifyOidc.middleware');
const { handleAppleWebhook } = require('../controllers/webhook.controller');

const router = express.Router();

router.post('/play', verifyOidc, controller.handlePlayWebhook);
router.post('/apple', handleAppleWebhook);

module.exports = router;
