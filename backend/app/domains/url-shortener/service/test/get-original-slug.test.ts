import { selectOriginalUrl, selectUrlSlugByOriginalUrl } from "../../data-access";
import { getOriginalUrlBySlug } from "./../index";

const logger = {
  error: jest.fn(),
  info: jest.fn(),
};

jest.mock("../../data-access");
jest.mock("../../../../config/logger");
jest.mock("uuid", () => ({
  v4: () => "123-uuid",
}));
jest.mock("nanoid", () => jest.fn(() => "123456SDI1"));

describe("Unit test for getOriginalUrlBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("getOriginalUrlBySlug should return the associated original url when the slug is recognized", async () => {
    (selectOriginalUrl as jest.Mock).mockResolvedValue("https://example.com");

    const slug = "abcd1234";
    const result = await getOriginalUrlBySlug(slug);

    expect(result).toBe("https://example.com");
    expect(selectOriginalUrl).toHaveBeenCalledWith(slug);
  });

  test("getOriginalUrlBySlug should return a not found error when the slug is not recognized", async () => {
    (selectUrlSlugByOriginalUrl as jest.Mock).mockResolvedValue(undefined);

    const slug = "not-found-slug";
    await expect(getOriginalUrlBySlug(slug)).rejects.toThrow("url not found");
  });
});
