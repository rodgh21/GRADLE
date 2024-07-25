const config = require('./config/config');

const { local, log, info, error, setLogLevel } = require("./logger");
const debug = log.extend('debug');


exports.handler = async event => {
  await setLogLevel(config.NODE_ENV, config.DEBUG_PARAMETER_STORE);

  debug("Print all variables.\n");
  debug("NODE_ENV: ", config.NODE_ENV);
  local("DISTRIBUTION_PARAMETER_STORE: ", config.DISTRIBUTION_PARAMETER_STORE);
  info("DEBUG_PARAMETER_STORE: ", config.DEBUG_PARAMETER_STORE);
  error("TARGET_BUCKET: ", config.TARGET_BUCKET);
  debug("TARGET_FILENAME: ", config.TARGET_FILENAME);

  return "Done";
};