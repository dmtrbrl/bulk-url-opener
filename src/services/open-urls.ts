/* eslint-disable @typescript-eslint/no-explicit-any */
declare const browser: any;

export const openUrlInBrowser = (url: string, lazy = false): void => {
  // Check if the browser.tabs API is available
  if (typeof browser !== "undefined" && browser.tabs) {
    // Firefox and other browsers that support the browser.* namespace
    browser.tabs
      .create({ url: lazy ? browser.runtime.getURL("lazyload.html#") + url : url, active: false })
      .catch((error: any) => console.error("Error opening tab:", error));
  } else if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.create) {
    // Chrome
    chrome.tabs.create({ url: lazy ? chrome.runtime.getURL("lazyload.html#") + url : url, active: false });
  } else {
    console.error("Browser API not found!");
  }
};
