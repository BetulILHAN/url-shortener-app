import { customAlphabet, nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { insertUrlShortener } from "../../data-access";
import { createUrlShortener } from "..";

const logger = {
  error: jest.fn(),
  info: jest.fn(),
};

jest.mock("../../data-access");
jest.mock("../../../../config/logger");
jest.mock("uuid", () => ({
  v4: () => "1234-uuid",
}));
jest.mock("nanoid", () => ({
  customAlphabet: () => () => "123456SDI1",
}));

describe("Unit test for createUrlShortener", () => {
  test("createUrlShortener should create a url shortener with a unique slug", async () => {
    (insertUrlShortener as jest.Mock).mockResolvedValue(true);

    const originalUrl = "https://example.com";
    await createUrlShortener(originalUrl);

    expect(insertUrlShortener).toHaveBeenCalledWith({
      id: "1234-uuid",
      originalURL: originalUrl,
      urlSlug: "123456SDI1",
      createdAt: expect.any(Date),
    });
  });

  it("createUrlShortener should handle the slug duplication", async () => {
    (insertUrlShortener as jest.Mock).mockRejectedValueOnce({ code: "23505" });

    const originalUrl = "https://example.com";
    const result = await createUrlShortener(originalUrl);

    expect(result).toBe(true);
    expect(insertUrlShortener).toHaveBeenCalledTimes(3);
  });
});
