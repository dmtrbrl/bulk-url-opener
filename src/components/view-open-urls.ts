import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { historyService } from "@services/history";
import { openUrlsService } from "@services/open-urls";
import { settingsService } from "@services/settings";

import { styles } from "./view-open-urls-styles";

@customElement("view-open-urls")
export class ViewOpenUrls extends LitElement {
  static styles = styles;

  @property({ type: String })
  private urls = openUrlsService.getUrls();

  // Handle input change event
  private handleChange = (e: InputEvent): void => {
    const { value } = e.target as HTMLInputElement;
    openUrlsService.setUrls(value);
    this.urls = value;
    this.requestUpdate();
  };

  // Handle form submission
  private handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    openUrlsService.openUrls(settingsService.getLazyload(), settingsService.getRandomOrder());
    historyService.pushToHistory(openUrlsService.getUrlsArray());
  };

  // Render the form
  private renderForm() {
    const isButtonDisabled = !this.urls.trim();
    const urlsAmount = openUrlsService.getUrlsArray().length;
    const buttonText = `Open ${urlsAmount > 0 ? (urlsAmount === 1 ? "1 URL" : `${urlsAmount} URLs`) : "URLs"}`;

    return html`
      <form @submit="${this.handleSubmit}" class="open-urls-form">
        <textarea placeholder="Enter each URL on a new line" .value=${this.urls} @input=${this.handleChange}></textarea>
        <button type="submit" ?disabled=${isButtonDisabled}>${buttonText}</button>
      </form>
    `;
  }

  // Main render method
  protected render() {
    return this.renderForm();
  }
}
