export type Theme = 'dark' | 'light';

export const LOCAL_STORAGE_THEME_KEY: string = 'theme';

function init() {
  document.body.setAttribute('data-theme', getTheme());

  // Prevent automatic theme switching if user manually selected a theme
  if(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', themeChangeListener);

  window.addEventListener('unload', () => {
    mediaQuery.removeEventListener('change', themeChangeListener);
  });
}

function themeChangeListener() {
  document.body.setAttribute('data-theme', getTheme());
};

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getTheme(): Theme {
  const selectedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  if (selectedTheme === null || selectedTheme === 'system') {
    return getSystemTheme();
  }
  return selectedTheme as Theme;
}

function setTheme(newTheme: Theme | ""): void {
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  themeChangeListener();
}

export const themeService = {
  init,
  getTheme,
  setTheme,
};
