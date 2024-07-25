const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `variables-${process.env.NODE_ENV}.yaml`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DISTRIBUTION_PARAMETER_STORE: process.env.DISTRIBUTION_PARAMETER_STORE,
  DEBUG_PARAMETER_STORE: process.env.DEBUG_PARAMETER_STORE,
  TARGET_FILENAME: process.env.TARGET_FILENAME,
  TARGET_BUCKET: process.env.TARGET_BUCKET,
};
