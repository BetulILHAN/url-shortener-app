import { isValidUrl } from "./is-valid-url";

describe(" Unit test for isValidUrl", () => {
  test.each([
    ["http://example.com", true],
    ["https://example.com/path?query=1", true],
    ["https://sub.domain.co.uk", true],
    ["www.example.com", false],
    ["http://example.c", false],
    ["http://exa mple.com", false],
    ["", false],
    ["not a url", false],
    ["https://example.com:8080/path", false],
    ["http://localhost", false],
  ])("returns %p for URL %s", (url, expected) => {
    expect(isValidUrl(url)).toBe(expected);
  });
});
