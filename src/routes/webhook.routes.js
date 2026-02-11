const express = require('express');
const controller = require('../controllers/webhook.controller');
const verifyOidc = require('../middleware/verifyOidc.middleware');

const router = express.Router();

router.post('/play', verifyOidc, controller.handlePlayWebhook);

module.exports = router;
