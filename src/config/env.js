require('dotenv').config();
const Joi = require('joi');

const schema = Joi.object({
  PORT: Joi.number().default(5000),

  GOOGLE_PACKAGE_NAME: Joi.string().required(),
  GOOGLE_SERVICE_ACCOUNT_BASE64: Joi.string().required(),

  GOOGLE_OIDC_AUDIENCE: Joi.string().uri().required(),
  PUBSUB_SERVICE_ACCOUNT: Joi.string().email().required(),

  APPLE_ISSUER_ID: Joi.string().required(),
  APPLE_KEY_ID: Joi.string().required(),
  APPLE_BUNDLE_ID: Joi.string().required(),
  APPLE_PRIVATE_KEY_BASE64: Joi.string().required(),
  APPLE_WEBHOOK_SHARED_SECRET: Joi.string().required(),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
}).unknown();

const { value: envVars, error } = schema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const privateKey = Buffer.from(
  envVars.APPLE_PRIVATE_KEY_BASE64,
  'base64'
).toString('utf8');

// Decode Base64
const serviceAccountJson = JSON.parse(
  Buffer.from(envVars.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
);

module.exports = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,

  google: {
    packageName: envVars.GOOGLE_PACKAGE_NAME,
    serviceAccount: serviceAccountJson,
    oidcAudience: envVars.GOOGLE_OIDC_AUDIENCE,
    pubsubServiceAccount: envVars.PUBSUB_SERVICE_ACCOUNT,
  },
  apple: {
    issuerId: envVars.APPLE_ISSUER_ID,
    keyId: envVars.APPLE_KEY_ID,
    bundleId: envVars.APPLE_BUNDLE_ID,
    privateKey,
    webhookSecret: envVars.APPLE_WEBHOOK_SHARED_SECRET,
  },
};
