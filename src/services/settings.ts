export type ThemeType = "dark" | "light" | "system";

/**
 * Service for managing application settings including theme, lazyload, and randomOrder.
 * Utilizes localStorage for persistence and responds to system theme changes.
 */
export class SettingsService {
  private static readonly LAZYLOAD_KEY = "lazyload";
  private static readonly RANDOMORDER_KEY = "randomOrder";
  private static readonly THEME_KEY = "theme";
  private static readonly DEFAULT_LAZYLOAD = false;
  private static readonly DEFAULT_RANDOMORDER = false;
  private prefersColorSchemeQuery: MediaQueryList | null;

  constructor() {
    this.prefersColorSchemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    this.prefersColorSchemeQuery?.addEventListener("change", this.handlePrefersColorSchemeChange);
    this.initializeTheme();
  }

  private handlePrefersColorSchemeChange = (): void => {
    if (this.getTheme() === "system") {
      this.updateBodyThemeAttribute();
    }
  };

  private updateBodyThemeAttribute(): void {
    const currentTheme = this.getTheme();
    document.body.setAttribute(
      "data-theme",
      currentTheme === "system" ? (this.prefersColorSchemeQuery?.matches ? "dark" : "light") : currentTheme,
    );
  }

  public getLazyload(): boolean {
    return localStorage.getItem(SettingsService.LAZYLOAD_KEY) === "true" || SettingsService.DEFAULT_LAZYLOAD;
  }

  public setLazyload(value: boolean): void {
    localStorage.setItem(SettingsService.LAZYLOAD_KEY, String(value));
  }

  public getRandomOrder(): boolean {
    return localStorage.getItem(SettingsService.RANDOMORDER_KEY) === "true" || SettingsService.DEFAULT_RANDOMORDER;
  }

  public setRandomOrder(value: boolean): void {
    localStorage.setItem(SettingsService.RANDOMORDER_KEY, String(value));
  }

  public getTheme(): ThemeType {
    return (localStorage.getItem(SettingsService.THEME_KEY) as ThemeType) || "system";
  }

  public setTheme(value: ThemeType): void {
    localStorage.setItem(SettingsService.THEME_KEY, value);
    this.updateBodyThemeAttribute();
  }

  /**
   * Initializes the theme based on current settings or system preference.
   */
  public initializeTheme(): void {
    this.setTheme(this.getTheme());
  }
}

export const settingsService = new SettingsService();
