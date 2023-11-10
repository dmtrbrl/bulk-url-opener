import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const style = css`
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
      padding: 10px;
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
      &:hover {
        background: var(--focus-color);
      }
    }
  }
`;

@customElement("view-open-urls")
export class ViewOpenUrls extends LitElement {
  static styles = style;
  private handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    alert("submit");
  };
  protected render() {
    return html`
      <form @submit="${this.handleSubmit}" class="open-urls-form">
        <textarea placeholder="List of URLs / Text to extract URLs from"></textarea>
        <button type="submit">Open URLs</button>
      </form>
    `;
  }
}
