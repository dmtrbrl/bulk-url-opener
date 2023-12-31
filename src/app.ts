import { type Routes, routerService } from "@services/router";
import { settingsService } from "@services/settings";

import "@components/view-open-urls";
import "@components/view-history";
import "@components/view-settings";

const routes: Routes = {
  "#": `view-open-urls`,
  "#history": "view-history",
  "#settings": "view-settings",
};

window.addEventListener("DOMContentLoaded", () => {
  settingsService.initializeTheme();
  routerService.init(".view", routes);
});
