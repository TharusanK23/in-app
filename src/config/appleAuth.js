const jwt = require('jsonwebtoken');
const env = require('./env');

function generateAppleJWT() {
  const now = Math.floor(Date.now() / 1000);

  const token = jwt.sign(
    {
      iss: env.apple.issuerId,
      iat: now,
      exp: now + 60 * 20, // 20 minutes
      aud: 'appstoreconnect-v1',
      bid: env.apple.bundleId,
    },
    env.apple.privateKey,
    {
      algorithm: 'ES256',
      header: {
        alg: 'ES256',
        kid: env.apple.keyId,
      },
    }
  );

  return token;
}

module.exports = { generateAppleJWT };
