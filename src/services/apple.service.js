const axios = require('axios');
const { generateAppleJWT } = require('../config/appleAuth');

let cachedKeys = null;

async function getApplePublicKeys() {

  if (cachedKeys) return cachedKeys;

  const response = await axios.get(
    'https://api.storekit.itunes.apple.com/inApps/v1/notifications/publicKeys'
  );

  cachedKeys = response.data.keys;

  return cachedKeys;
}

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
  getApplePublicKeys
};
