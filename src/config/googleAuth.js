const { google } = require('googleapis');
const env = require('./env');

const auth = new google.auth.GoogleAuth({
  keyFile: env.google.serviceAccountPath,
  scopes: ['https://www.googleapis.com/auth/androidpublisher'],
});

const androidpublisher = google.androidpublisher({
  version: 'v3',
  auth,
});

module.exports = androidpublisher;
