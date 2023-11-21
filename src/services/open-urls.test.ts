import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { OpenUrlsService } from "./open-urls";

describe("OpenUrlsService", () => {
  let openUrlsService: OpenUrlsService;
  let openUrlInBrowserSpy: unknown;

  beforeEach(() => {
    openUrlsService = new OpenUrlsService();
    openUrlInBrowserSpy = vi.spyOn(
      openUrlsService as unknown as { openUrlInBrowser: (url: string, lazy: boolean) => void },
      "openUrlInBrowser",
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set and get URLs correctly", () => {
    const testUrls = "https://example.com\nhttps://example.org";
    openUrlsService.setUrls(testUrls);
    expect(openUrlsService.getUrls()).toBe(testUrls);
  });

  it("should remove empty lines when setting URLs", () => {
    const testUrls = "https://example.com\n\nhttps://example.org\n\n";
    const expectedUrls = "https://example.com\nhttps://example.org";
    openUrlsService.setUrls(testUrls);
    expect(openUrlsService.getUrls()).toBe(expectedUrls);
  });

  it("should open URLs correctly", () => {
    openUrlsService.setUrls("https://example.com\nhttps://example.org");
    openUrlsService.openUrls();

    expect(openUrlInBrowserSpy).toHaveBeenCalledTimes(2);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.com", false);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.org", false);
  });

  it("should open URLs lazily when lazy flag is true", () => {
    openUrlsService.setUrls("https://example.com\nhttps://example.org");
    openUrlsService.openUrls(true);

    expect(openUrlInBrowserSpy).toHaveBeenCalledTimes(2);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.com", true);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.org", true);
  });
});
