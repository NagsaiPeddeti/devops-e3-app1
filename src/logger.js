const winston = require('winston');
const LokiTransport = require("winston-loki");
const config=require("config");


const logger = winston.createLogger({
  level: config.get("logProperties.level"),
  format: winston.format.json(),
  defaultMeta: { service: config.get("logProperties.serviceName") },
  transports: [
    new winston.transports.Console()
  ],
});

if (config.get("logProperties.lokiLogger")) {
    logger.add( new LokiTransport({
        host: config.get("logProperties.lokiUrl")
      }));
  }

module.exports=logger;