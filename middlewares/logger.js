const pinoHttp = require("pino-http");

const logger = pinoHttp({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

module.exports = logger;
