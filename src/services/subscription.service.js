function mapSubscriptionData(data) {
  return {
    expiryDate: Number(data.expiryTimeMillis),
    autoRenewing: data.autoRenewing,
    paymentState: data.paymentState,
    cancelReason: data.cancelReason ?? null,
  };
}

module.exports = {
  mapSubscriptionData,
};
