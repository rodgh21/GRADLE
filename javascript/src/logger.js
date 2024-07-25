const debug = require('debug');

const local = debug('local');
const log = debug('app:log');
const error = debug('app:error');
const info = debug('app:info');

log.log = console.log.bind(console);
info.log = console.info.bind(console);
error.log = console.error.bind(console);

const setLogLevel = async (env, debug_param_name) => {
  if (env === 'local') {
    debug.enable('local*,app*');
    local('Set local log enabled');
  } else {
    debug.enable('app*');
    info('Set local log disabled');

    // Set Log Level with the value of Parameter Store
    const SSMClient = require("./modules/SSMClient");
    const ssmClient = new SSMClient(debug_param_name);
    await ssmClient.getValue()
      .then(data => {
        log('Debug Setting:', data.level);
        debug.enable(data.level);
      })
      .catch(err => {
        debug.enable('app*');
        error(err);
      });
  }
};

module.exports = { local, log, error, info, setLogLevel };
