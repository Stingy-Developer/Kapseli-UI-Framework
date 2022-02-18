import { Component } from "./Component";

export class Provider extends Component {
  constructor({ stylesheet_url }) {
    super({
      use_memo: "provider",
      data: {},
      template: (
        <div id="app_provider">
          <slot></slot>
        </div>
      ),
      methods: {},
      props: {},
      mounted: () => {
        const style = document.createElement("link");

        style.setAttribute("href", stylesheet_url);
        style.setAttribute("rel", "stylesheet");
        document.querySelector("head").appendChild(style);
      },
    });
    this.component_uuid = "__UUID__PROVIDER";
  }
}
