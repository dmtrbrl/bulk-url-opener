import { beforeEach, describe, expect, it } from "vitest";

import { RouterService, Routes } from "./router";

const mockContent = () => {
  document.body.innerHTML = `
    <a href="#">Home</a>
    <a href="#about">About</a>
    <div id="view"></div>
  `;
};

describe("RouterService", () => {
  let routerService: RouterService;
  const routes: Routes = {
    "#": "app-home",
    "#about": "app-about",
  };

  beforeEach(() => {
    mockContent();
    routerService = new RouterService();
  });

  it("should handle default route", () => {
    routerService.init("#view", routes);
    expect(document.querySelector(`a[href="#"]`)?.classList.contains("active")).toBe(true);
    expect(document.querySelector("#view")?.innerHTML).toBe("<app-home></app-home>");
  });

  it("should handle selected routes", () => {
    window.location.hash = "#about";
    routerService.init("#view", routes);
    expect(document.querySelector(`a[href="#about"]`)?.classList.contains("active")).toBe(true);
    expect(document.querySelector("#view")?.innerHTML).toBe("<app-about></app-about>");
  });

  it("should handle unknown routes", () => {
    window.location.hash = "#unknown";
    routerService.init("#view", routes);
    expect(document.querySelector(`a[href^="#"].active`)).toBe(null);
    expect(document.querySelector("#view")?.innerHTML).toBe("");
  });
});
