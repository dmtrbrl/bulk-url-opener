import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsService } from "./settings";
import localStorageMock from "@mocks/localStorageMock";

// Mock document.body.setAttribute
document.body.setAttribute = vi.fn();

describe("SettingsService", () => {
  let settingsService: SettingsService;

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    settingsService = new SettingsService();
  });

  describe("getLazyload", () => {
    it("should return the current lazyload setting", () => {
      localStorageMock.setItem("lazyload", "true");
      expect(settingsService.getLazyload()).toBe(true);
    });

    it("should return false as default if no lazyload setting is set", () => {
      expect(settingsService.getLazyload()).toBe(false);
    });
  });

  describe("setLazyload", () => {
    it("should set the lazyload setting", () => {
      settingsService.setLazyload(true);
      expect(localStorageMock.getItem("lazyload")).toBe("true");
    });
  });

  describe("getRandomOrder", () => {
    it("should return the current randomOrder setting", () => {
      localStorageMock.setItem("randomOrder", "true");
      expect(settingsService.getRandomOrder()).toBe(true);
    });

    it("should return false as default if no randomOrder setting is set", () => {
      expect(settingsService.getRandomOrder()).toBe(false);
    });
  });

  describe("setRandomOrder", () => {
    it("should set the randomOrder setting", () => {
      settingsService.setRandomOrder(true);
      expect(localStorageMock.getItem("randomOrder")).toBe("true");
    });
  });

  describe("getTheme", () => {
    it("should return the current theme", () => {
      localStorageMock.setItem("theme", "dark");
      expect(settingsService.getTheme()).toBe("dark");
    });

    it('should return "system" as default if no theme is set', () => {
      expect(settingsService.getTheme()).toBe("system");
    });
  });

  describe("setTheme", () => {
    it("should set the theme", () => {
      settingsService.setTheme("light");
      expect(localStorageMock.getItem("theme")).toBe("light");
      expect(document.body.setAttribute).toHaveBeenCalledWith("data-theme", "light");
    });
  });
});
