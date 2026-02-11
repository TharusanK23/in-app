const playService = require('../services/play.service');
const subscriptionService = require('../services/subscription.service');

async function verifySubscription(req, res) {
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

module.exports = {
  verifySubscription,
};
