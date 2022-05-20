import { Component } from "./Component";
import { JSX } from "../vdom/jsx";

export class Provider extends Component {
  constructor({ stylesheet_url }) {
    super({
      useMemo: "provider",
      template: (
        <div id="app_provider">
          <slot></slot>
        </div>
      ),
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
