import winston from "winston";

const { errors, timestamp, simple, colorize } = winston.format;
const { LOG_LEVEL: logLevel = "info", LOG_SILENT: logSilent } = process.env;

const formats = [
  colorize({ level: true }),
  errors({ stack: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  simple(),
];

const format = winston.format.combine(...formats);

const logger = winston.createLogger({
  format,
  level: logLevel ?? "info",
  transports: [new winston.transports.Console()],
  silent: logSilent == "true",
});

export default logger;
