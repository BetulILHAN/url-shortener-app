import dataBase from "../../../../infrastructure/database/data-source";
import logger from "../../../config/logger";
import { URLShortener, URLShortenerRow } from "../../types";

const urlShortenerSchema = "url_shortener";
const convertUserFromRow = (urlShortenerRow: URLShortenerRow): URLShortener => {
  return {
    id: urlShortenerRow.id,
    originalURL: urlShortenerRow.original_url,
    urlSlug: urlShortenerRow.url_slug,
    createdAt: urlShortenerRow.created_at,
    clickCount: urlShortenerRow.click_count,
  };
};

const convertURLShortenerToRow = (urlShortener: URLShortener): URLShortenerRow => {
  return {
    id: urlShortener.id,
    original_url: urlShortener.originalURL,
    url_slug: urlShortener.urlSlug,
    created_at: urlShortener.createdAt,
    click_count: urlShortener.clickCount,
  };
};

const selectUrlSlugByOriginalUrl = async (originalUrl: string): Promise<string | undefined> => {
  const queryBuilder = dataBase<URLShortenerRow>(urlShortenerSchema);
  const selectedResult = await queryBuilder
    .select("url_slug")
    .where("original_url", originalUrl)
    .first();

  return selectedResult?.url_slug;
};

const insertUrlShortener = async (urlShortener: URLShortener): Promise<string | undefined> => {
  const queryBuilder = dataBase<URLShortenerRow>(urlShortenerSchema);
  const urlShortenerRow = convertURLShortenerToRow(urlShortener);

  const [result] = await queryBuilder
    .insert(urlShortenerRow)
    .onConflict("original_url")
    .ignore()
    .returning(["url_slug"]);

  return result.url_slug;
};

const selectOriginalUrl = async (slug: string): Promise<string | undefined> => {
  const queryBuilder = dataBase<URLShortenerRow>(urlShortenerSchema);

  const [result] = await queryBuilder
    .where({ url_slug: slug })
    .increment("click_count", 1)
    .returning(["original_url"]);

  return result.original_url;
};

export { insertUrlShortener, selectOriginalUrl, selectUrlSlugByOriginalUrl };
