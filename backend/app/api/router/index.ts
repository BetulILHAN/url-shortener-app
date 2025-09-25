import express from "express";
import {
  originalUrlSchema,
  slugParamSchema,
  validateOriginalUrlBody,
  validateSlugParams,
} from "./validator";
import { handlePostUrlShortener, handleRedirectToOriginalURL } from "./handler";

const urlShortenerRouter = express.Router();

urlShortenerRouter.post(
  "/api/url-shortener",
  validateOriginalUrlBody(originalUrlSchema),
  handlePostUrlShortener,
);

urlShortenerRouter.get("/:slug", validateSlugParams(slugParamSchema), handleRedirectToOriginalURL);

export default urlShortenerRouter;
