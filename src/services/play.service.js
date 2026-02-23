const {auth, androidpublisher} = require('../config/googleAuth');
const env = require('../config/env');

const getAccessToken = async () => {
  const client = await auth.getClient();
  const { token } = await client.getAccessToken();
  console.log("Access Token:", token);
  if (!token) throw new Error("Failed to retrieve access token");
  return token;
};

async function verifySubscription(purchaseToken, subscriptionId) {
  
  try {
    const packageName = env.google.packageName;
    const accessToken = await getAccessToken();

    const url = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${subscriptionId}/tokens/${purchaseToken}`;
    console.log("Request URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response:", JSON.stringify(errorData));
      // throw new Error(
      //   `Request failed with status ${response.status}: ${errorData.error.message}`
      // );
      return null;
    }

    const data = await response.json();
    console.log("Subscription Data:", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Failed to call Play Developer API:", error);
    return null;
  }


  // const response = await androidpublisher.purchases.subscriptions.get({
  //   packageName: env.google.packageName,
  //   subscriptionId,
  //   token: purchaseToken,
  // });

  // return response.data;
}

module.exports = {
  verifySubscription,
};
