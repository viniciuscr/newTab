let tmpl = document.createElement("template");
tmpl.innerHTML = `
<style>
@import "../../css/grid.css";
</style>
<div class="item-content"><slot></slot></div>
`;

customElements.define(
  "aba-cate",
  class extends HTMLElement {
    constructor() {
      super();

      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }
  }
);
