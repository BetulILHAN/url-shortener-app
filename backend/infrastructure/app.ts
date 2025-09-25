import express from "express";
import injectConfig from "../app/api/config";
import urlShortenerRouter from "../app/api/router";

const app = express();

injectConfig(app);

app.use("/", express.json(), urlShortenerRouter);

export default app;
