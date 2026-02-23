const { google } = require('googleapis');
const env = require('./env');

const auth = new google.auth.GoogleAuth({
  credentials: env.google.serviceAccount, // use decoded Base64 JSON
  scopes: ['https://www.googleapis.com/auth/androidpublisher'],
});

const androidpublisher = google.androidpublisher({
  version: 'v3',
  auth,
});

module.exports = {auth, androidpublisher};


