import type { Request, Response } from "express";
import express from "express";
import { getOriginalUrlBySlug, getUrlSlug } from "../../../domains/url-shortener/service";

interface RequestTypedBody<T> extends Express.Request {
  body: T;
}

const handlePostUrlShortener = async (
  req: RequestTypedBody<{ originalURL: string }>,
  res: Response,
) => {
  try {
    const { originalURL } = req.body;
    const result = await getUrlSlug(originalURL);

    if (!result) {
      return res.status(404).send("URL NOT FOUND");
    }

    const port = process.env.PORT_BACKEND ?? 3001;
    const host = process.env.HOST ?? `http://localhost:${port}`;
    const shortUrl = `${host}/${result}`;

    return res.send(shortUrl);
  } catch (err) {
    console.error("Error shortening URL:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const handleRedirectToOriginalURL = async (req: Request<{ slug: string }>, res: Response) => {
  try {
    const { slug } = req.params;
    const originalUrl = await getOriginalUrlBySlug(slug);
    if (!originalUrl) {
      return res.status(404).send("URL NOT FOUND");
    }
    return res.redirect(originalUrl);
  } catch (err) {
    console.error("Error  redirecting original URL:", err);
    return res.status(500).send("Internal Server Error");
  }
};

export { handlePostUrlShortener, handleRedirectToOriginalURL };
