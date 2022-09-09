//@ts-nocheck
import { Component } from "./Component";
import Offcanvas from "bootstrap/js/dist/offcanvas";
import { JSX } from "../vdom/jsx";

export interface FloatPanelProp {
  id: string;
  location?: string;
  title: string;
}

export interface StaticPanelProp {
  id: string;
  location?: string;
  title: string;
  uri: string;
}

export class FloatPanel extends Component {
  $options: any;
  constructor({ location = "start", id, title }: FloatPanelProp) {
    super({
      useMemo: id,
      data: {
        location: "panel panel-" + location,
        title,
      },
      template: (
        <div bind-class="location" tabindex="-1" id={id}>
          <div class="panel-header">
            <h5 class="panel-title">
              <data k-data="title"></data>
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              aria-label="Close"
              onclick="panel_hide"
            ></button>
          </div>
          <div class="panel-body small">
            <slot></slot>
          </div>
        </div>
      ),
      methods: {
        panel_hide: (_e) => {
          this.$options.hide();
        },
        panel_show: () => {
          this.$options.show();
        },
      },
      mounted() {
        this.$options = new Offcanvas(document.getElementById(id));
      },
    });
  }
}

export class StaticPanel extends Component {
  constructor({ location = "start", title, id, uri }: StaticPanelProp) {
    super({
      useMemo: id,
      data: {
        location: "static-panel static-panel-" + location,
        title,
      },
      template: (
        <div bind-class="location">
          <a class="static-panel-header" href={uri}>
            <img
              src="https://avatars.githubusercontent.com/u/59289764?s=60&v=4"
              alt=""
            />
            <span class="static-panel-title">
              <data v-data="title"></data>
            </span>
          </a>
          <hr />
          <div>
            <slot />
          </div>
        </div>
      ),
    });
  }
}
