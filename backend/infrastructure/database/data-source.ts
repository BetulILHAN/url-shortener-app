import "dotenv/config";
import knex from "knex";
import logger from "../../app/config/logger";

const port = process.env.DB_PORT as number | undefined;

const dbConnection = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  //entities: [`${__dirname}/**/entities/*.{ts,js}`],
  //migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
};

const dataBase = knex({
  client: "pg",
  connection: dbConnection,
  pool: { min: 0, max: 100 },
  debug: process.env.LOG_LEVEL === "debug",
  log: {
    warn(detail) {
      logger.warn("knex warning", detail);
    },
    error(detail) {
      logger.error("knex error", detail);
    },
    deprecate(detail) {
      logger.info("Knex deprecate", detail);
    },
  },
});

export default dataBase;
