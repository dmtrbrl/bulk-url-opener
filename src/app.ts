import { themeService } from "./services/theme";
import { type Routes, routerService } from "./services/router";

const routes: Routes = {
  "#": "<strong>Open URLs content</strong>",
  "#lists": "<strong>Lists content</strong>",
  "#settings": "<strong>Settings content</strong>",
};

window.addEventListener("DOMContentLoaded", () => {
  themeService.init();
  routerService.init(".view", routes);
});
