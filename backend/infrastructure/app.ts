import express, { Request, Response } from "express";
import userRouter from "../app/api/router/handler";
import injectConfig from "../app/api/config";

const app = express();

injectConfig(app);

app.use("/", express.json(), userRouter);

export default app;
