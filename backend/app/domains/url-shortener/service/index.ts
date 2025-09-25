import { selectOriginalUrl, insertUrlShortener, selectUrlSlugByOriginalUrl } from "../data-access";
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

const createUrlShortener = async (originalUrl: string, retries = 5) => {
  const normalizedUrl = normalizeUrl(originalUrl);
  const urlSlug = customAlphabet("1234567890abcdef", 10);

  if (retries <= 0) {
    throw new Error("Failed to generate unique slug after multiple attempts");
  }

  try {
    const urlShortener: URLShortener = {
      id: uuid(),
      originalURL: normalizedUrl,
      urlSlug: urlSlug(),
      createdAt: new Date(),
      clickCount: 0,
    };

    return await insertUrlShortener(urlShortener);
  } catch (error) {
    const newError = error as SqlError;
    if (newError.code === "23505") {
      logger.error(`url slug ${urlSlug()} is already existed`);
      return createUrlShortener(originalUrl, retries - 1);
    }
    logger.error(`DB error on insert: ${newError.message}`);
    throw error;
  }
};

const getUrlSlug = async (originalUrl: string): Promise<string | undefined> => {
  const normalizedUrl = normalizeUrl(originalUrl);
  try {
    const existedUrlSlug = await selectUrlSlugByOriginalUrl(normalizedUrl);

    if (existedUrlSlug === undefined) {
      const createUrlSlug = await createUrlShortener(normalizedUrl);
      logger.info(`url shortener is created with the url slug : ${createUrlSlug}`);
      return createUrlSlug;
    }
    logger.info(`url slug already existed: ${existedUrlSlug}`);
    return existedUrlSlug;
  } catch (error) {
    logger.error(
      `Error retrieving or creating slug for ${originalUrl}: ${(error as Error).message}`,
    );
    return undefined;
  }
};

const getOriginalUrlBySlug = async (urlSlug: string): Promise<string | undefined> => {
  const originalUrl = await selectOriginalUrl(urlSlug);
  try {
    if (originalUrl === undefined) {
      logger.warn(`original url doesn't exist for url slug: ${urlSlug}`);
      return undefined;
    }
    logger.info(`original url ${originalUrl} is gotten`);
    return originalUrl;
  } catch (error) {
    logger.error(`Error retrieving original URL for slug ${urlSlug}: ${(error as Error).message}`);
    return undefined;
  }
};
export { createUrlShortener, getOriginalUrlBySlug, getUrlSlug };
