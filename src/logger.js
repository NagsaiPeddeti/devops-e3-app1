const winston = require('winston');
const config=require("config");


const logger = winston.createLogger({
  level: config.get("logProperties.level"),
  format: winston.format.json(),
  defaultMeta: { service: config.get("logProperties.serviceName") },
  transports: [
    new winston.transports.File({ filename: config.get("logProperties.filename") }),
  ],
});

module.exports=logger;