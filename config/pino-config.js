const pino = require("pino");
const os = require("os")
const dotenv = require('dotenv');
dotenv.config();
const streams = [
    { stream: process.stdout },
    { stream: pino.destination({ dest: "./logs/pino-logger.log", sync: true, }) },
];

const logger = pino(
    {
        level: "info", //process.env.LOG_LEVEL || "info",
        timestamp: pino.stdTimeFunctions.isoTime,
        base: { pid: process.pid, hostname: os.hostname(), server: process.env.NODE_ENV },
        redact: {
            paths: ['req'],
            censor: '**GDPR COMPLIANT**'
        },
    },
    pino.multistream(streams)
);
const errorLogger = pino(
    {
        level: "error", //process.env.LOG_LEVEL || "info",
        source: process.env.NODE_ENV,
        timestamp: pino.stdTimeFunctions.isoTime,
        redact: ['req'],
    },
);

module.exports = {
    logger,
    errorLogger
} 
