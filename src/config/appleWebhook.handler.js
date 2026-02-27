const jwt = require('jsonwebtoken');

async function handleNotification(payload) {

  const {
    notificationType,
    subtype,
    data
  } = payload;

  console.log('Notification:', notificationType);

  // Decode inner JWTs
  const transaction =
    jwt.decode(data.signedTransactionInfo);
  console.log("Transaction:", transaction);

  const renewal =
    jwt.decode(data.signedRenewalInfo);
  console.log("Renewal:", renewal);

  const originalTransactionId =
    transaction.originalTransactionId;

  const productId = transaction.productId;

  const expiresDate =
    transaction.expiresDate;

  switch (notificationType) {

    case 'SUBSCRIBED':
      console.log('✅ New Subscription');
      break;

    case 'DID_RENEW':
      console.log('✅ Subscription Renewed');
      break;

    case 'DID_FAIL_TO_RENEW':
      console.log('⚠ Payment Failed');
      break;

    case 'EXPIRED':
      console.log('❌ Subscription Expired');
      break;

    case 'REFUND':
      console.log('💰 Refunded');
      break;

    case 'REVOKE':
      console.log('🚫 Revoked');
      break;

    default:
      console.log('Unhandled:', notificationType);
  }

  console.log({
    originalTransactionId,
    productId,
    expiresDate,
    autoRenewStatus:
      renewal?.autoRenewStatus
  });

  /**
   * HERE:
   * Update your database
   *
   * subscription.status
   * subscription.expiry
   */
}

module.exports = handleNotification;