const playService = require('../services/play.service');
const logger = require('../utils/logger');

async function handlePlayWebhook(req, res) {
  try {
    const message = req.body.message;
    console.log("Request Body:", JSON.stringify(message, null, 2));

    const decoded = JSON.parse(
      Buffer.from(message.data, 'base64').toString()
    );
    console.log("Decoded Request Body:", JSON.stringify(decoded, null, 2));

    const notification = decoded.subscriptionNotification;
    console.log("Notification:", JSON.stringify(notification, null, 2));

    if(notification) {
      const purchaseToken = notification.purchaseToken;
      console.log("Purchase Token:", JSON.stringify(purchaseToken, null, 2));

      const subscriptionId = notification.subscriptionId;
      console.log("SubscriptionId:", JSON.stringify(subscriptionId, null, 2));

      const latestData = await playService.verifySubscription(
        purchaseToken,
        subscriptionId
      );
      console.log("Latest Data:", JSON.stringify(latestData, null, 2));
      
      logger.info('Decoded Latest Data', JSON.stringify(latestData, null, 2));
    } else {
      console.log("No any Datas");
    }
    
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
