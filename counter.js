class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  // 3, 6
  get count() {
    console.log("get count");
    return this.getAttribute("count");
  }

  set count(val) {
    this.setAttribute("count", val);
  }

  // 0
  static get observedAttributes() {
    console.log("observedAttributes");
    return ["count"];
  }

  // 1
  attributeChangedCallback(prop, oldVal, newVal) {
    console.log("atttibuteChangedCallback");
    if (prop === "count") this.render();
  }

  inc() {
    this.count++;
  }

  // 4
  connectedCallback() {
    console.log("connectedCallback");
    this.render();
  }

  // 2, 5
  render() {
    console.log("render");
    this.shadow.innerHTML = `
    <h1>Counter</h1>
    ${this.count} // get count()
    <button id='btn'>Increment</button>
    `;
    let btn = this.shadow.querySelector("#btn");
    btn.addEventListener("click", this.inc.bind(this));
  }
}

customElements.define("my-counter", MyCounter);
