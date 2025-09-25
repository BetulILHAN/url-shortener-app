import winston from "winston";

const { errors, timestamp, simple, colorize } = winston.format;
const { LOG_LEVEL: logLevel = "info" } = process.env;

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
});

export default logger;
