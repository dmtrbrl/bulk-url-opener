/* eslint-disable @typescript-eslint/no-explicit-any */
declare const browser: any;

/**
 * Opens a given URL in a new browser tab. This function is compatible with
 * browsers that support the WebExtensions API, such as Chrome and Firefox.
 *
 * @param {string} url - The URL to be opened in a new browser tab.
 */
export const openUrlInBrowser = (url: string): void => {
  // Check if the browser.tabs API is available
  if (typeof browser !== "undefined" && browser.tabs) {
    // Firefox and other browsers that support the browser.* namespace
    browser.tabs.create({ url }).catch((error: any) => console.error("Error opening tab:", error));
  } else if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
    // Chrome
    chrome.tabs.create({ url });
  } else {
    console.error("Browser API not found!");
  }
};
