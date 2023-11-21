import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { openUrlsService } from "../services/open-urls";
import { settingsService } from "../services/settings";

const styles = css`
  .open-urls-form {
    display: flex;
    height: 100%;
    flex-direction: column;
    & textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      resize: none;
      background: transparent;
      border-color: var(--border-color);
      line-height: 17px;
      font-size: 13px;
      padding: 10px 10px 30px;
      color: var(--text-color);
      resize: none;
      height: 100%;
    }
    & button {
      border: 0;
      color: var(--text-color);
      background: var(--border-color);
      margin-top: 10px;
      height: 40px;
      cursor: pointer;
      transition: background-color 0.25s ease-in;
      &:hover {
        background: var(--focus-color);
      }
    }
    & textarea,
    & button {
      &:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -2px;
      }
    }
  }
`;

@customElement("view-open-urls")
export class ViewOpenUrls extends LitElement {
  static styles = styles;
  private handleChange = (e: InputEvent): void => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    openUrlsService.setUrls(value);
  };
  private handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    openUrlsService.openUrls(settingsService.getLazyload(), settingsService.getRandomOrder());
  };
  protected render() {
    return html`
      <form @submit="${this.handleSubmit}" class="open-urls-form">
        <textarea
          placeholder="Type the list of URLs"
          .value=${openUrlsService.getUrls()}
          @change=${this.handleChange}
        ></textarea>
        <button type="submit">Open URLs</button>
      </form>
    `;
  }
}
