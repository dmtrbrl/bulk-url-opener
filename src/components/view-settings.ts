import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ThemeType, settingsService } from "../services/settings";
import icons from "../assets/icons.svg";

const styles = css`
  .settings {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .settings-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .settings-list-item {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
    &:first-child {
      padding-top: 0;
    }
  }
  .settings-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
  }
  .settings-footer-version {
    opacity: 0.6;
    cursor: default;
  }
  .settings-footer-links {
    display: flex;
    & a {
      display: flex;
      align-items: center;
      margin-left: 20px;
      color: var(--text-color);
      text-decoration: none;
      opacity: 0.6;
      transition: all 0.25s ease-in;
      &:hover {
        opacity: 1;
      }
      &:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      & svg {
        display: block;
        width: 16px;
        height: 16px;
        fill: currentColor;
        margin-right: 7px;
      }
    }
  }
  .switch {
    appearance: none;
    display: block;
    position: relative;
    cursor: pointer;
    width: 38px;
    height: 22px;
    border: 2px solid var(--border-color);
    background: var(--border-color);
    border-radius: 12px;
    transition: all 0.1s ease-out;
    margin: 0;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      background: var(--light-color);
      border-radius: 9px;
      opacity: 0.7;
      transition: all 0.1s ease-out;
    }
    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    &:checked {
      background: var(--primary-color);
      border-color: var(--primary-color);
      &::after {
        transform: translateX(16px);
        opacity: 1;
      }
      &:focus-visible {
        outline-color: var(--border-color);
      }
    }
  }
  .radio-group {
    display: flex;
    & label {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 15px;
    }
    & input {
      appearance: none;
      display: block;
      position: relative;
      width: 18px;
      height: 18px;
      border-radius: 9px;
      background: var(--border-color);
      margin: 0 5px 0 0;
      cursor: pointer;
      transition: all 0.1s ease-out;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 10px;
        height: 10px;
        background: transparent;
        border-radius: 5px;
        transition: all 0.1s ease-out;
      }
      &:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -2px;
      }
      &:checked {
        background: var(--primary-color);
        &::after {
          background: var(--light-color);
        }
        &:focus-visible {
          outline-color: var(--border-color);
        }
      }
    }
  }
`;

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
  private handleThemeChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const theme = target.value as ThemeType;
    settingsService.setTheme(theme);
  };
  protected render() {
    return html`
      <section class="settings">
        <ul class="settings-list">
          <li class="settings-list-item">
            <span>Load tabs only when they are selected</span>
            <input
              class="switch"
              type="checkbox"
              ?checked=${settingsService.getLazyload()}
              @change=${() => settingsService.setLazyload(!settingsService.getLazyload())}
            />
          </li>
          <li class="settings-list-item">
            <span>Load tabs in random order</span>
            <input
              class="switch"
              type="checkbox"
              ?checked=${settingsService.getRandomOrder()}
              @change=${() => settingsService.setRandomOrder(!settingsService.getRandomOrder())}
            />
          </li>
          <li class="settings-list-item">
            <span>Appearance</span>
            <div class="radio-group">
              ${appearanceOptions.map(
                (a) =>
                  html`<label>
                    <input
                      type="radio"
                      name="appearance"
                      .value=${a.value}
                      ?checked=${a.value === settingsService.getTheme()}
                      @change="${this.handleThemeChange}"
                    />
                    <span>${a.label}</span>
                  </label>`,
              )}
            </div>
          </li>
        </ul>
        <footer class="settings-footer">
          <span class="settings-footer-version">Version: ${APP_VERSION}</span>
          <div class="settings-footer-links">
            <a href="https://github.com/dmtrbrl/bulk-url-opener" target="_blank">
              <svg>
                <use href="${icons}#github" />
              </svg>
              Github
            </a>
            <a href="https://github.com/dmtrbrl/bulk-url-opener/issues" target="_blank">
              <svg>
                <use href="${icons}#reportIssue" />
              </svg>
              Report an issue
            </a>
          </div>
        </footer>
      </section>
    `;
  }
}
