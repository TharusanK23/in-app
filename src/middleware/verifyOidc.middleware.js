const { OAuth2Client } = require('google-auth-library');
const env = require('../config/env');

const client = new OAuth2Client();

async function verifyOidc(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", JSON.stringify(authHeader, null, 2));
  
  if (!authHeader) {
    return res.status(401).send('Missing Authorization');
  }

  const token = authHeader.split(' ')[1];

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: env.google.oidcAudience,
    });

    const payload = ticket.getPayload();

    if (payload.email !== env.google.pubsubServiceAccount) {
      return res.status(403).send('Invalid service account');
    }

    next();
  } catch (err) {
    return res.status(401).send('Invalid OIDC token');
  }
}

module.exports = verifyOidc;
