const playService = require('../services/play.service');
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const handleNotification = require('../config/appleWebhook.handler');

async function handlePlayWebhook(req, res) {
  try {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    const message = req.body.message;
    console.log("Request Body Message:", JSON.stringify(message, null, 2));

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

async function handleAppleWebhook(req, res) {
  try {

    const { signedPayload } = req.body;

    if (!signedPayload)
      return res.status(400).send('Missing payload');
    console.log("Signed Payload:", JSON.stringify(signedPayload, null, 2));
    // Decode header
    const decoded =
      jwt.decode(signedPayload, { complete: true });

    if (!decoded)
      throw new Error('Invalid JWT');
    console.log("Decoded:", JSON.stringify(decoded, null, 2));
    // ✅ Apple certificate from JWT
    const cert = decoded.header.x5c[0];

    const publicKey =
`-----BEGIN CERTIFICATE-----
${cert}
-----END CERTIFICATE-----`;
    console.log("PublicKey:", publicKey);
    // ✅ VERIFY SIGNATURE
    const verifiedPayload =
      jwt.verify(signedPayload, publicKey, {
        algorithms: ['ES256']
      });

    console.log(
      "Verified Payload:",
      verifiedPayload
    );

    // Handle notification
    await handleNotification(verifiedPayload);

    res.status(200).send();

  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
}

module.exports = {
  handlePlayWebhook,
  handleAppleWebhook
};
