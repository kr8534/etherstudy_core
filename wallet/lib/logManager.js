const winston = require('winston');

function getLabel(module) {
  const parts = module.filename.split('/');
  return parts[parts.length - 2] + '/' + parts.pop();
}

module.exports = function (module, logLevel) {
  const logger = new winston.Logger({
    level: logLevel
  });
  logger.add(winston.transports.Console, {
    label: getLabel(module),
    
  });

  logger.getErrMsg = function (message, e) {
    return {
      message: message,
      stack: e.stack
    }
  };

  return logger;
};