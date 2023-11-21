import { describe, expect, it, vi, beforeEach } from "vitest";
import { lazyLoadService } from "./lazyload";

const url = `https://github.com`;

describe("LazyLoadService", () => {
  Object.defineProperty(window, "location", {
    value: {
      hash: `#${url}`,
      replace: vi.fn(),
    },
    writable: true,
  });

  beforeEach(() => {
    lazyLoadService.init();
  });

  it("should set title and redirect on focus", () => {
    expect(document.title).toBe("[github.com]");
    expect(window.location.replace).toHaveBeenCalledTimes(0);

    window.dispatchEvent(new Event("focus"));

    expect(window.location.replace).toHaveBeenLastCalledWith(url);
  });
});
