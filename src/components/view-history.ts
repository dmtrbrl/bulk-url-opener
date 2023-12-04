import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { historyService } from "@services/history";
import { repeat } from "lit/directives/repeat.js";
import icons from "@assets/icons.svg";
import { openUrlsService } from "@services/open-urls";
import { settingsService } from "@services/settings";
import { styles } from "./view-history-styles";

@customElement("view-history")
export class History extends LitElement {
  static styles = styles;
  private history = historyService.getHistory();
  private openUrlsAgain = (urls: string[]) => {
    openUrlsService.setUrls(urls);
    openUrlsService.openUrls(settingsService.getLazyload(), settingsService.getRandomOrder());
    historyService.pushToHistory(urls);
  };
  protected render() {
    const content = this.history.length
      ? html`
          <div class="history">
            ${repeat(this.history, (item) => {
              return html`
                <details>
                  <summary>
                    <svg><use href="${icons}#detailsMarker" /></svg>
                    <span>${item.date.toLocaleString()}</span>
                    <span>
                      ${item.urls.length > 0 ? (item.urls.length === 1 ? "1 URL" : `${item.urls.length} URLs`) : "URLs"}
                    </span>
                  </summary>
                  <ul>
                    ${item.urls.map((url) => html`<li>${url}</li>`)}
                  </ul>
                  <footer>
                    <button @click=${() => this.openUrlsAgain(item.urls)}>
                      <svg><use href="${icons}#urls" /></svg>
                      Open again
                    </button>
                  </footer>
                </details>
              `;
            })}
          </div>
        `
      : html`<div class="history-empty">History is empty</div>`;
    return content;
  }
}
