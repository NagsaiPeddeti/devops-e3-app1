const winston = require('winston');
const LokiTransport = require("winston-loki");
const config=require("config");


const logger = winston.createLogger({
  level: config.get("logProperties.level"),
  format: winston.format.json(),
  defaultMeta: {labels:{ service: config.get("logProperties.serviceName")} },
  transports: [
    new LokiTransport({
      host: config.get("logProperties.lokiUrl")
    }),
    new winston.transports.Console()
  ],
});



module.exports=logger;