import { Component } from "./Component";

export class Provider extends Component {
  constructor() {
    super({
      data: {},
      template: (
        <div id={"app_provider_" + Math.random().toString(16).substring(2)}>
          <slot></slot>
        </div>
      ),
      methods: {},
      props: {},
    });
  }
}
