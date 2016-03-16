var winston = require('winston');
var mkpath = require('mkpath');
var path = require('path');
winston.emitErrs = true;
var logger = null;

exports.init = function (config) {

  // create log file dir
  mkpath.sync(path.dirname(config.transports.allFile.filename));
  mkpath.sync(path.dirname(config.transports.errorFile.filename));

  logger = new winston.Logger({
    transports: [
      new winston.transports.Console(config.transports.console),
      new winston.transports.File(config.transports.allFile),
      new winston.transports.File(config.transports.errorFile)
    ],
    exitOnError: false
  });
  logger.stream = {
    write: function (message, encoding) {
      logger.info(message);
    }
  };

  exports.logger = logger;
  return logger;
};
