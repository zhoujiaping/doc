//npm install winston
//npm install uuid
const uuid = require('uuid');
const winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint, json} = format;

const process = require('process');

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'black',
    debug: 'gray'
  }
};
const myFormat = printf(info => {
	if(info.stack){
	    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}\n${info.stack}`;
	}else{
	    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
	}
});
function newLogger(loglabel = uuid.v4()){
	winston.addColors(customLevels.colors);

    const logger = createLogger({
	  levels:customLevels.levels,
      format: combine(
        label({ label: loglabel}),
        timestamp(),
		//json(),
        myFormat
	  ),

      transports: [
		new transports.Console({colorize:true}),
		new transports.File({ filename: 'logs/debug.log', level: 'debug' }),
		new transports.File({ filename: 'logs/info.log', level: 'info' }),
		new transports.File({ filename: 'logs/warn.log', level: 'warn' }),
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/combined.log' })
		]
    });
	logger.my = {
		label:loglabel
	};
	winston.addColors(customLevels.colors);
	
	const origError = logger.error;
    return logger;
}

const defaultLogger = newLogger();
const log = {
    newLogger,
    defaultLogger
};
/*
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
*/
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
/*
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}*/
process.on('uncaughtException', err => {
	log.defaultLogger.error(err);
	throw err;
});
process.on('unhandledRejection', (reason,promise) => {
	log.defaultLogger.error(reason);
	throw reason;
});
module.exports = log;
