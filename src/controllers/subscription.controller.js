const playService = require('../services/play.service');
const appleService = require('../services/apple.service');
const subscriptionService = require('../services/subscription.service');

async function verifyPlaySubscription(req, res) {
  const { purchaseToken, productId } = req.body;

  try {
    const googleResponse = await playService.verifySubscription(
      purchaseToken,
      productId
    );

    const mappedData =
      subscriptionService.mapSubscriptionData(googleResponse);

    // TODO: Save to database here

    res.json({
      success: true,
      subscription: mappedData,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

async function verifyAppleSubscription(req, res) {
  const { originalTransactionId } = req.body;

  try {
    const data = await appleService.getSubscriptionStatus(originalTransactionId);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  verifyPlaySubscription,
  verifyAppleSubscription
};
