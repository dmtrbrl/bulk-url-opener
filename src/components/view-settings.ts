import { html, render } from "lit-html";

class ViewSettings extends HTMLElement {
  private root: ShadowRoot;
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    render(html` <p>Settings</p> `, this.root);
  }
}

customElements.define("view-settings", ViewSettings);
