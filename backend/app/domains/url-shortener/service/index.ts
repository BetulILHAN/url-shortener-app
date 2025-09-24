import {
  selectOriginalUrl,
  insertUrlShortener,
  selectUrlSlugByOriginalUrl,
} from "../data-access";
import { v4 as uuidv4 } from "uuid";
import { customAlphabet } from "nanoid";
import logger from "../../../config/logger";
import normalizeUrl from "normalize-url";
import { URLShortener } from "../../types";

interface SqlError extends Error {
  code?: string;
  detail?: string;
}
const uuid = uuidv4;

const createUrlShortener = async (originalUrl: string) => {
  const urlSlug = customAlphabet("1234567890abcdef", 10);
  const id = uuid();

  try {
    const urlShortener: Omit<URLShortener, "clickCount"> = {
      id: uuid(),
      originalURL: originalUrl,
      urlSlug: urlSlug(),
      createdAt: new Date(),
    };

    return await insertUrlShortener(urlShortener);
  } catch (error) {
    const newError = error as SqlError;
    if (newError.code === "23505") {
      logger.error(`url slug ${urlSlug()} is already existed`);
      return createUrlShortener(originalUrl);
    }
  }
};

const getUrlSlug = async (originalUrl: string): Promise<string | undefined> => {
  const normalizedUrl = normalizeUrl(originalUrl);

  const existedUrlSlug = await selectUrlSlugByOriginalUrl(normalizedUrl);
  if (existedUrlSlug === undefined) {
    const createUrlSlug = await createUrlShortener(normalizedUrl);
    logger.info(
      `url shortener is created with the url slug : ${createUrlSlug}`,
    );
    return createUrlSlug;
  }
  logger.info(`url slug already existed: ${existedUrlSlug}`);
  return existedUrlSlug;
};

const getOriginalUrlBySlug = async (
  urlSlug: string,
): Promise<string | undefined> => {
  const originalUrl = await selectOriginalUrl(urlSlug);

  if (originalUrl === undefined) {
    logger.error(`original url doesn't exist for url slug: ${urlSlug}`);
    throw new Error("url not found");
  }
  logger.info(`original url ${originalUrl} is gotten`);
  return originalUrl;
};
export { createUrlShortener, getOriginalUrlBySlug, getUrlSlug };
