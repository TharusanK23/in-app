const playService = require('../services/play.service');
const logger = require('../utils/logger');

async function handlePlayWebhook(req, res) {
  try {
    const message = req.body.message;

    const decoded = JSON.parse(
      Buffer.from(message.data, 'base64').toString()
    );

    const notification = decoded.subscriptionNotification;

    const purchaseToken = notification.purchaseToken;
    const subscriptionId = notification.subscriptionId;

    const latestData = await playService.verifySubscription(
      purchaseToken,
      subscriptionId
    );

    console.log("Decoded Latest Data:", JSON.stringify(latestData, null, 2));
    logger.info('Decoded Latest Data', JSON.stringify(latestData, null, 2));
    // TODO: Update DB with latestData

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}

module.exports = {
  handlePlayWebhook,
};
