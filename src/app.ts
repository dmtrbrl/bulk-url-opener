import { themeService } from "./services/theme";
import { type Routes, routerService } from "./services/router";
import "./components/view-open-urls";
import "./components/view-history";
import "./components/view-settings";

const routes: Routes = {
  "#": `<view-open-urls />`,
  "#history": "<view-history />",
  "#settings": "<view-settings />",
};

window.addEventListener("DOMContentLoaded", () => {
  themeService.init();
  routerService.init(".view", routes);
});
