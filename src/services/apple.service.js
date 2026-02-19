const axios = require('axios');
const { generateAppleJWT } = require('../config/appleAuth');

async function getSubscriptionStatus(originalTransactionId) {
  const token = generateAppleJWT();

  const response = await axios.get(
    `https://api.storekit.itunes.apple.com/inApps/v1/subscriptions/${originalTransactionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

module.exports = {
  getSubscriptionStatus,
};
