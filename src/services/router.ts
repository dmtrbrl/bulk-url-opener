/**
 * Defines a type representing a collection of routes in application.
 * The `Routes` type is an index signature that maps a hash string to a corresponding web component tag name string.
 * Each key-value pair represents a single route, with the key being a unique identifier (usually a hash),
 * and the value being the tag name of the web component that should be rendered for that route.
 *
 * @example
 * const routes: Routes = {
 *   '#home': 'app-home',
 *   '#about': 'app-about',
 *   '#contact': 'app-contact'
 * };
 */
export type Routes = {
  [hash: string]: string;
};

let _routerView: Element;
let _routes: Routes;

/**
 * Initializes the router with a view selector and a set of routes.
 * Attaches the routeChange function to the window's popstate event,
 * which is fired when the active history entry changes.
 *
 * @param {string} viewSelector - A DOM selector string that identifies the router view element.
 * @param {Routes} routes - An object mapping route patterns to web component tag names.
 * @throws Will throw an error if the view selector does not identify an element.
 */
function init(viewSelector: string, routes: Routes) {
  const routerView = document.querySelector(viewSelector);
  if (!routerView) throw new Error("view selector not found");
  _routerView = routerView;
  _routes = routes;

  window.addEventListener("popstate", routeChange);
  routeChange(); // Call routeChange to render the initial route.
}

function routeChange() {
  const hash = window.location.hash || "#";
  document.querySelector(`a[href^="#"].active`)?.classList.remove("active");
  document.querySelector(`a[href="${hash}"]`)?.classList.add("active");
  _routerView.innerHTML = _routes[hash];
}

export const routerService = {
  init,
};
