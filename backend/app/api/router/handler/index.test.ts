import { Request, Response } from "express";
import { getOriginalUrlBySlug, getUrlSlug } from "../../../domains/url-shortener/service";
import { handlePostUrlShortener, handleRedirectToOriginalURL } from "./index";

jest.mock("../../../domains/url-shortener/service");
jest.mock("uuid", () => ({
  v4: () => "123-uuid",
}));
jest.mock("nanoid", () => jest.fn(() => "123456SDI1"));

describe("Unit tests for URL Shortener Handlers", () => {
  describe("Unit tests for handlePostUrlShortener", () => {
    test("handlePostUrlShortener should return a shortened URL when original URL is valid", async () => {
      (getUrlSlug as jest.Mock).mockResolvedValue("123456SDI1");

      const req = {
        body: { originalURL: "https://example.com" },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await handlePostUrlShortener(req, res);

      expect(getUrlSlug).toHaveBeenCalledWith("https://example.com");
      expect(res.send).toHaveBeenCalledWith(expect.stringContaining("/123456SDI1"));
    });

    test("handlePostUrlShortener should return 404 when service returns null", async () => {
      (getUrlSlug as jest.Mock).mockResolvedValue(null);

      const req = {
        body: { originalURL: "https://doesnotexist.com" },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await handlePostUrlShortener(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("URL NOT FOUND");
    });

    test(" handlePostUrlShortener should return 500 when an error is thrown", async () => {
      (getUrlSlug as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

      const req = {
        body: { originalURL: "https://fail.com" },
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await handlePostUrlShortener(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    });
  });

  describe("Unit test for handleRedirectToOriginalURL", () => {
    it("handleRedirectToOriginalURL should redirect to the original URL when slug is found", async () => {
      (getOriginalUrlBySlug as jest.Mock).mockResolvedValue("https://original.com");

      const req = {
        params: { slug: "123456SDI1" },
      } as unknown as Request<{ slug: string }>;

      const res = {
        redirect: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await handleRedirectToOriginalURL(req, res);

      expect(getOriginalUrlBySlug).toHaveBeenCalledWith("123456SDI1");
      expect(res.redirect).toHaveBeenCalledWith("https://original.com");
    });

    it("handleRedirectToOriginalURL should return 404 when slug is not found", async () => {
      (getOriginalUrlBySlug as jest.Mock).mockResolvedValue(null);

      const req = {
        params: { slug: "notfound" },
      } as unknown as Request<{ slug: string }>;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      await handleRedirectToOriginalURL(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("URL NOT FOUND");
    });
  });
});
