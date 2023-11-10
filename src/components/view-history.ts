import { html, render } from "lit-html";

class ViewHistory extends HTMLElement {
  private root: ShadowRoot;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    render(html` <p>History</p> `, this.root);
  }
}

customElements.define("view-history", ViewHistory);
