/* eslint-disable @typescript-eslint/no-explicit-any */
declare const browser: any;

/**
 * Service for managing and opening a list of URLs.
 * Allows setting URLs as a string, retrieving them for display, and opening them in the browser.
 */
export class OpenUrlsService {
  private urls: string[] = [];

  /**
   * Gets the current list of URLs as a single string, suitable for display in a textarea.
   * @returns A string containing all URLs separated by newlines.
   */
  public getUrls(): string {
    return this.urls.join("\n");
  }

  /**
   * Gets the current list of URLs as an array.
   * @returns An array of URLs.
   */
  public getUrlsArray(): string[] {
    return this.urls;
  }

  /**
   * Sets the list of URLs from either a newline-separated string or an array of URLs.
   * @param urls - A string containing a list of URLs, each separated by a newline, or an array of URLs.
   */
  public setUrls(urls: string | string[]): void {
    if (Array.isArray(urls)) {
      // If 'urls' is an array, filter out any empty strings
      this.urls = urls.filter((url) => url.trim() !== "");
    } else {
      // If 'urls' is a string, split it by newlines and filter out any empty strings
      this.urls = urls.split("\n").filter((url) => url.trim() !== "");
    }
  }

  /**
   * Opens the stored URLs in the browser.
   * @param lazy - Determines if the URLs should be opened lazily.
   * @param random - If true, opens URLs in a random order.
   */
  public openUrls(lazy: boolean = false, random: boolean = false): void {
    const urlList = random ? this.shuffle([...this.urls]) : [...this.urls];

    urlList.forEach((url) => {
      this.openUrlInBrowser(url, lazy);
    });

    window.close();
  }

  /**
   * Shuffles the elements of an array in a random order.
   * @param array - The array to shuffle.
   * @returns A new array with elements in random order.
   */
  private shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  /**
   * Private method for opening a URL in the browser.
   * @param url - The URL to be opened.
   * @param lazy - Determines if the URL should be opened lazily.
   */
  private openUrlInBrowser(url: string, lazy: boolean): void {
    // Prepend 'https://' if the URL does not start with a protocol
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // Browser API checks and tab creation logic
    if (typeof browser !== "undefined" && browser.tabs) {
      browser.tabs
        .create({ url: lazy ? browser.runtime.getURL("lazyload.html#") + url : url, active: false })
        .catch((error: any) => console.error("Error opening tab:", error));
    } else if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
      chrome.tabs.create({ url: lazy ? chrome.runtime.getURL("lazyload.html#") + url : url, active: false });
    } else {
      console.error("Browser API not found!");
    }
  }
}

export const openUrlsService = new OpenUrlsService();
