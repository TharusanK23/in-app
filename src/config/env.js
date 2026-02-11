require('dotenv').config();
const Joi = require('joi');

const schema = Joi.object({
  PORT: Joi.number().default(5000),

  GOOGLE_PACKAGE_NAME: Joi.string().required(),
  GOOGLE_SERVICE_ACCOUNT_BASE64: Joi.string().required(),

  GOOGLE_OIDC_AUDIENCE: Joi.string().uri().required(),
  PUBSUB_SERVICE_ACCOUNT: Joi.string().email().required(),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
}).unknown();

const { value: envVars, error } = schema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

// Decode Base64
const serviceAccountJson = JSON.parse(
  Buffer.from(value.GOOGLE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
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
};
