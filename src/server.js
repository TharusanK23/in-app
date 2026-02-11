const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');

const PORT = env.port || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${env.port}`);
  console.log(`Server running on port ${PORT}`);
});
