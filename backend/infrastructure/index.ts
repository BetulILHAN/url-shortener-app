import logger from "../app/config/logger";
import app from "./app";

const port = process.env.PORT_BACKEND ?? 3001;

const server = app.listen(port, () => {
  logger.info(`url shortener API is started on port ${port}`);
});
