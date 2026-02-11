const androidpublisher = require('../config/googleAuth');
const env = require('../config/env');

async function verifySubscription(purchaseToken, subscriptionId) {
  const response = await androidpublisher.purchases.subscriptions.get({
    packageName: env.google.packageName,
    subscriptionId,
    token: purchaseToken,
  });

  return response.data;
}

module.exports = {
  verifySubscription,
};
