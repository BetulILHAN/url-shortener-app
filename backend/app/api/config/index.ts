import type express from "express";
import morganMiddleware from "./morgan/index";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const injectConfig = (app: express.Application) => {
  app.use(morganMiddleware);
  app.use(helmet());
  app.disable("x-powered-by");

  app.use(cookieParser());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    cors({ origin: process.env.AUTHORIZED_CORS_ORIGIN, credentials: true }),
  );
};

export default injectConfig;
