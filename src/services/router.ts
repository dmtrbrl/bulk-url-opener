/**
 * Represents a mapping of route patterns to web component tag names.
 * Each key-value pair in this object defines a route, where the key is a unique hash string
 * and the value is the tag name of the web component to render for that route.
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

/**
 * Service for managing routing in the application.
 * This service enables navigation by updating the view based on the current URL hash.
 */
export class RouterService {
  private routerView!: Element;
  private routes!: Routes;
  private isInitialized = false;

  /**
   * Initializes the router with a view selector and a set of routes.
   * Attaches the routeChange function to the window's popstate event.
   *
   * @param {string} viewSelector - A DOM selector string that identifies the router view element.
   * @param {Routes} routes - An object mapping route patterns to web component tag names.
   * @throws Will throw an error if the view selector does not identify an element.
   */
  public init(viewSelector: string, routes: Routes): void {
    if (this.isInitialized) {
      console.warn("RouterService is already initialized.");
      return;
    }

    const routerView = document.querySelector(viewSelector);

    if (!routerView) throw new Error("View selector not found");
    this.routerView = routerView;
    this.routes = routes;

    window.addEventListener("popstate", this.routeChange);
    this.routeChange();

    this.isInitialized = true;
  }

  private routeChange = (): void => {
    const hash = window.location.hash || "#";
    this.updateActiveLink(hash);
    this.renderRouteComponent(hash);
  };

  private updateActiveLink(hash: string): void {
    document.querySelector(`a[href^="#"].active`)?.classList.remove("active");
    document.querySelector(`a[href="${hash}"]`)?.classList.add("active");
  }

  private renderRouteComponent(hash: string): void {
    const routeComponent = this.routes[hash];
    if (routeComponent) {
      this.routerView.innerHTML = `<${routeComponent} />`;
    } else {
      console.error(`No component found for route ${hash}`);
      this.routerView.innerHTML = "";
    }
  }
}

export const routerService = new RouterService();
