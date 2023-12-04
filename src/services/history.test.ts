import { describe, it, expect, beforeEach } from "vitest";
import { HistoryService } from "./history";
import localStorageMock from "../mocks/localStorageMock";

describe("HistoryService", () => {
  let historyService: HistoryService;

  beforeEach(() => {
    historyService = new HistoryService();
    localStorageMock.clear(); // Ensure localStorage is cleared before each test
  });

  it("should initially have an empty history", () => {
    expect(historyService.getHistory()).toEqual([]);
  });

  it("should add a new history item", () => {
    const urls = ["https://example.com", "https://example.org"];
    historyService.pushToHistory(urls);
    const history = historyService.getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].urls).toEqual(urls);
  });

  it("should update the date of an existing history item", async () => {
    const urls = ["https://example.com", "https://example.org"];
    historyService.pushToHistory(urls); // First push

    const initialDate = historyService.getHistory()[0].date;

    // Wait for a short period to ensure a different timestamp
    await new Promise((resolve) => setTimeout(resolve, 10));

    historyService.pushToHistory(urls); // Second push with the same URLs

    const updatedHistory = historyService.getHistory();
    expect(updatedHistory).toHaveLength(1);
    expect(updatedHistory[0].urls).toEqual(urls);
    expect(updatedHistory[0].date).not.toEqual(initialDate);
  });

  it("should return history items sorted by date from latest", async () => {
    const urls1 = ["https://example.com"];
    const urls2 = ["https://example.org"];

    historyService.pushToHistory(urls1);
    await new Promise((resolve) => setTimeout(resolve, 10)); // short delay
    historyService.pushToHistory(urls2);

    const history = historyService.getHistory();
    expect(history).toHaveLength(2);
    expect(history[0].urls).toEqual(urls2);
    expect(history[1].urls).toEqual(urls1);
  });

  it("should clear the history", () => {
    historyService.pushToHistory(["https://example.com"]);
    historyService.clearHistory();
    expect(historyService.getHistory()).toEqual([]);
  });
});
