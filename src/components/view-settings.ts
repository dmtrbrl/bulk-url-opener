import { LitElement, type TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, type Ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import { historyService } from "@services/history";
import { ThemeType, settingsService } from "@services/settings";
import icons from "@assets/icons.svg";
import { styles } from "./view-settings-styles";

const appearanceOptions: { label: string; value: ThemeType }[] = [
  {
    label: "Auto",
    value: "system",
  },
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
];

@customElement("view-settings")
export class ViewSettings extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) private lazyLoad = settingsService.getLazyload();
  @property({ type: Boolean }) private randomOrder = settingsService.getRandomOrder();
  @property({ type: String }) private theme = settingsService.getTheme();

  private clearHistoryButtonRef: Ref<HTMLButtonElement> = createRef();
  private clearHistoryConfirmRef: Ref<HTMLDialogElement> = createRef();

  private handleThemeChange(theme: ThemeType) {
    this.theme = theme;
    settingsService.setTheme(theme);
  }

  private toggleSetting(setting: "lazyLoad" | "randomOrder") {
    const newValue = !this[setting];
    this[setting] = newValue;

    if (setting === "lazyLoad") {
      settingsService.setLazyload(newValue);
    } else if (setting === "randomOrder") {
      settingsService.setRandomOrder(newValue);
    }
  }

  private clearHistory(confirmed: boolean = false) {
    this.clearHistoryConfirmRef.value!.close();
    if (!confirmed) return;
    historyService.clearHistory();
    this.clearHistoryButtonRef.value!.disabled = true;
  }

  protected render() {
    return html`
      <section class="settings">
        <ul class="settings-list">
          ${this.renderSettingsItem(
            "Load tabs only when they are selected",
            this.renderSwitch("lazyLoad", this.lazyLoad),
          )}
          ${this.renderSettingsItem("Load tabs in random order", this.renderSwitch("randomOrder", this.randomOrder))}
          ${this.renderSettingsItem("Appearance", this.renderAppearanceOptions())}
          ${this.renderSettingsItem("History", this.renderClearHistoryButton())}
        </ul>
        ${this.renderFooter()}
      </section>
    `;
  }

  private renderSettingsItem(label: string, control: TemplateResult) {
    return html`
      <li class="settings-list-item">
        <span>${label}</span>
        ${control}
      </li>
    `;
  }

  private renderSwitch(setting: "lazyLoad" | "randomOrder", checked: boolean) {
    return html`
      <input class="switch" type="checkbox" ?checked=${checked} @change=${() => this.toggleSetting(setting)} />
    `;
  }

  private renderAppearanceOptions() {
    return html`
      <div class="radio-group">
        ${repeat(
          appearanceOptions,
          (option) =>
            html`<label>
              <input
                type="radio"
                name="appearance"
                .value=${option.value}
                ?checked=${option.value === this.theme}
                @change=${() => this.handleThemeChange(option.value)}
              />
              <span>${option.label}</span>
            </label>`,
        )}
      </div>
    `;
  }

  private renderClearHistoryButton() {
    return html`
      <button
        ${ref(this.clearHistoryButtonRef)}
        ?disabled=${!historyService.getHistory().length}
        @click=${() => this.clearHistoryConfirmRef.value!.showModal()}
      >
        Clear history
      </button>
      <dialog ${ref(this.clearHistoryConfirmRef)}>
        <p>
          Please confirm: Do you really want to clear all your browsing history? This action cannot be undone and all
          saved history will be permanently removed.
        </p>
        <footer>
          <button @click=${() => this.clearHistory(false)}>Cancel</button>
          <button @click=${() => this.clearHistory(true)}>Confirm</button>
        </footer>
      </dialog>
    `;
  }

  private renderFooter() {
    return html`
      <footer class="settings-footer">
        <span class="settings-footer-version">Version: ${APP_VERSION}</span>
        <div class="settings-footer-links">
          <a href="https://github.com/dmtrbrl/bulk-url-opener" target="_blank">
            <svg><use href="${icons}#github" /></svg>
            Github
          </a>
          <a href="https://github.com/dmtrbrl/bulk-url-opener/issues" target="_blank">
            <svg><use href="${icons}#reportIssue" /></svg>
            Report an issue
          </a>
        </div>
      </footer>
    `;
  }
}
