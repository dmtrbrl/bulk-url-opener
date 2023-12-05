import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { OpenUrlsService } from "./open-urls";

describe("OpenUrlsService", () => {
  let openUrlsService: OpenUrlsService;
  let openUrlInBrowserSpy: unknown;
  let windowCloseSpy: unknown;

  beforeEach(() => {
    openUrlsService = new OpenUrlsService();
    openUrlInBrowserSpy = vi.spyOn(
      openUrlsService as unknown as { openUrlInBrowser: (url: string, lazy: boolean) => void },
      "openUrlInBrowser",
    );
    windowCloseSpy = vi.spyOn(window, "close").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set and get URLs correctly", () => {
    const testUrlsString = "https://example.com\nhttps://example.org";
    const testUrlsArray = ["https://example.com", "https://example.org"];
    openUrlsService.setUrls(testUrlsString);
    expect(openUrlsService.getUrls()).toBe(testUrlsString);
    expect(openUrlsService.getUrlsArray()).toEqual(testUrlsArray);
    openUrlsService.setUrls(testUrlsArray);
    expect(openUrlsService.getUrls()).toBe(testUrlsString);
    expect(openUrlsService.getUrlsArray()).toEqual(testUrlsArray);
  });

  it("should remove empty lines when setting URLs", () => {
    const testUrlsString = "https://example.com\n\nhttps://example.org\n\n";
    const testUrlsArray = ["https://example.com", "", "https://example.org", ""];
    const expectedUrls = "https://example.com\nhttps://example.org";
    openUrlsService.setUrls(testUrlsString);
    expect(openUrlsService.getUrls()).toBe(expectedUrls);
    openUrlsService.setUrls(testUrlsArray);
    expect(openUrlsService.getUrls()).toBe(expectedUrls);
  });

  it("should open URLs correctly", () => {
    openUrlsService.setUrls(["https://example.com", "https://example.org"]);
    openUrlsService.openUrls();

    expect(openUrlInBrowserSpy).toHaveBeenCalledTimes(2);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.com", false);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.org", false);
    expect(windowCloseSpy).toHaveBeenCalled();
  });

  it("should open URLs lazily when lazy flag is true", () => {
    openUrlsService.setUrls(["https://example.com", "https://example.org"]);
    openUrlsService.openUrls(true);

    expect(openUrlInBrowserSpy).toHaveBeenCalledTimes(2);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.com", true);
    expect(openUrlInBrowserSpy).toHaveBeenCalledWith("https://example.org", true);
    expect(windowCloseSpy).toHaveBeenCalled();
  });
});
