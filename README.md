# Bulk URL Opener

![01](https://github.com/dmtrbrl/bulk-url-opener/assets/7405155/2f6ab091-fdb5-437c-9fbb-bd10b0d12fa5)

The Bulk URL Opener is a web extension that makes your online life a bit easier. It's perfect for anyone who needs to open a bunch of links at the same time.

Install the extension via [Chrome Web Store](https://chromewebstore.google.com/detail/jclbjhflehefkfnibjdigljoaggchhcd) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/buo/).

Here are the features:

1. Open URLs:

   Pop in a bunch of links, and voilà – they all open together. Super handy for when you've got a list of sites to check out.

3. History:

   The extension keeps a history of previously opened URLs. This is super helpful if you want to reopen those links later without having to remember or find them again.

5. Settings:
   
   • Lazy Load: Only loads a URL when you focus on its tab, keeping things smooth and your computer happy.
   
   • Random Order: Randomizes the order of opening your links, great for when you need a random sequence.

   • Appearance: Choose between a light or dark theme for the extension, or set it to 'auto' to match your system's theme. This makes the extension more comfortable to use and fits your personal style.

In short, the Bulk URL Opener is a simple, user-friendly extension that's all about making your browsing a bit more convenient and a little less cluttered.

## Development

First: Execute the package installation with `npm install`.

Next, proceed with one of these build commands:

| Command                   | Description                         | Output dir                      |
|:--------------------------|:------------------------------------|:--------------------------------|
| `npm run dev:firefox`     | real-time build (watch mode) for Firefox | `dist-firefox`             |
| `npm run dev:chrome`      | real-time build (watch mode) for Chrome  | `dist-chrome`              |
| `npm run build:firefox`   | production build for Firefox        | `dist-firefox`                  |
| `npm run build:chrome`    | production build for Chrome         | `dist-chrome`                   |

Refer to the [guidelines for Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) and the [steps for Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/) regarding the loading of an unpacked extension.

Review the `package.json` file to find all available run scripts.

