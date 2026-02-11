const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const subscriptionRoutes = require('./routes/subscription.routes');
const webhookRoutes = require('./routes/webhook.routes');

const app = express();

app.use(helmet());
app.use(morgan('combined'));


app.use(cors());
app.use(bodyParser.json());

/* ✅ Init Load View */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Subscription Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

/* ✅ Health Check */
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.use('/api/subscription', subscriptionRoutes);
app.use('/webhook', webhookRoutes);

module.exports = app;
