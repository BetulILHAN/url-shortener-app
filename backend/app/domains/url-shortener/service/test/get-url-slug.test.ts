import { getUrlSlug } from "./..";
import { selectOriginalUrl, selectUrlSlugByOriginalUrl } from "../../data-access";
import * as urlShortenerService from "./..";

const logger = {
  error: jest.fn(),
  info: jest.fn(),
};

jest.mock("../../data-access");
jest.mock("../../../../config/logger");
jest.mock("uuid", () => ({
  v4: () => "123-uuid",
}));
jest.mock("nanoid", () => ({
  customAlphabet: () => () => "123456SDI1",
}));

describe("Unit test for getUrlSlug", () => {
  test("getUrlSlug should return and existing slug", async () => {
    (selectUrlSlugByOriginalUrl as jest.Mock).mockResolvedValue("existing-slug");

    const originalUrl = "https://example.com";
    const result = await getUrlSlug(originalUrl);

    expect(result).toBe("existing-slug");
    expect(selectUrlSlugByOriginalUrl).toHaveBeenCalled();
  });
});
