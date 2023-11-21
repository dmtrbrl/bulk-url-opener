type LocalStorageMockStore = {
  [key: string]: string;
};

const localStorageMock = (() => {
  let store: LocalStorageMockStore = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value;
    },
    clear(): void {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

export default localStorageMock;
