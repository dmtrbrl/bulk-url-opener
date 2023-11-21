/**
 * Service for managing lazy loading functionality.
 * It listens to the window focus event to reload a specific URL stored in the window location hash.
 */
export class LazyLoadService {
  /**
   * Initializes the lazy load service.
   */
  public init = (): void => {
    const url = window.location.hash.substring(1);
    if (url) {
      this.updateDocumentTitle(url);
      this.setupFocusEventListener(url);
    }
  };

  /**
   * Updates the document title by removing 'http://' or 'https://' from the URL.
   * @param {string} url - The URL used in the document title.
   */
  private updateDocumentTitle = (url: string): void => {
    const titleUrl = url.replace(/^https?:\/\//, "");
    document.title = `[${titleUrl}]`;
  };

  /**
   * Sets up an event listener to reload the page when the window gains focus.
   * @param {string} url - The URL to navigate to.
   */
  private setupFocusEventListener = (url: string): void => {
    window.addEventListener(
      "focus",
      () => {
        window.location.replace(url);
      },
      false,
    );
  };
}

export const lazyLoadService = new LazyLoadService();
