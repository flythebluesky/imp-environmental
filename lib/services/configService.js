exports.config = {

  winston: {
    transports: {
      console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      },
      allFile: {
        name: 'file.info',
        level: 'info',
        filename: './logs/all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        prettyPrint: true
      },
      errorFile: {
        name: 'file.error',
        level: 'error',
        filename: './logs/errors.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false,
        prettyPrint: true
      }
    }
  }

};
