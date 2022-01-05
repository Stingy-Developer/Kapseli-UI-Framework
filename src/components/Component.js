import { VDom } from "../vdom/index";
import onChange from "on-change";

export class Component extends VDom {
  constructor(conf) {
    super({});
    let config = {
      props: [],
      methods: {},
      data: {},
      template: "",
      fetchMethod: false,
      mounted: () => {},
      updated: () => {},
      inheritances: [],
      use_memo: false,
      ...conf,
    };

    this.fetchMethod = config.fetchMethod
      ? {
          "data-kapseli-fetch-mode": config.fetchMethod.fetch_mode
            ? "on"
            : "off",
          "data-kapseli-fetch-method": config.fetchMethod.fetch.method,
          "data-kapseli-fetch-url": config.fetchMethod.fetch.url,
          "data-kapseli-fetch-opts": JSON.stringify(
            config.fetchMethod.fetch.opts
          ),
        }
      : false;

    this.mounted = config.mounted;
    this.updated = config.updated;
    this.props = config.props ? config.props : [];
    this.$props = {};
    this.$directives = {};
    this.methods = {};

    this.component_uuid = "__UUID__" + Math.random().toString(16).substring(2);

    this.methods = config.methods ? config.methods : {};
    this.notListenedData = {};
    this.$components = {};
    this._data = config.data || {};
    this.inheritance = config.inheritances;
    this.use_memo = config.use_memo;

    if (typeof config.template === "string") {
      let el = document.createElement("div");
      el.innerHTML = config.template;
      this.el = el.firstElementChild;
    } else if (
      typeof config.template === "object" ||
      typeof config.template === typeof []
    ) {
      this.el = config.template;
    }
  }

  _beautyVdom(vdom) {
    if (vdom && typeof vdom !== "string") {
      let newVDOM = {
        tag: vdom.tag,
        props: {},
        children: [],
      };

      newVDOM.props = this._beautyAttrForJSX(vdom.props);

      for (let i = 0; i < vdom.children.length; i++) {
        newVDOM.children.push(this._beautyVdom(vdom.children[i]));
      }
      return newVDOM;
    } else if (typeof vdom === "string") {
      return vdom;
    }
  }

  getData(key_str) {
    let data = this.data ? this.data : this._data;

    if (key_str === undefined) {
      return data;
    }
    // data will translate
    if (key_str.startsWith("t:")) {
      return this.klass.I18n.t(key_str.substring(2));
    }

    return this._get_data(
      key_str,
      data,
      this.notListenedData,
      this.klass.View.data
    );
  }

  renderProps(props) {
    try {
      if (this.el instanceof HTMLElement) {
        for (const key in props) {
          if (Object.hasOwnProperty.call(props, key)) {
            const prop_value = props[key];
            this.el.setAttribute(key, prop_value);
          }
        }
      } else {
        this.el.props = {
          ...this.el.props,
          ...props,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderVDom() {
    let renderedvdom = false;
    if (!this.app) {
      try {
        if (this.el instanceof HTMLElement) {
          this.$vdom = this._getVdom(this.el);
        } else {
          this.$vdom = this._beautyVdom(this.el);
        }
      } catch (error) {
        console.error(`Compiling Error=> ${error}`);
      }

      renderedvdom = this.renderGenerators(this.$vdom);
      renderedvdom = this.renderBindings(renderedvdom);

      this.$current_vdom = this.renderObject(
        renderedvdom,
        {
          component_uuid: this.component_uuid,
        },
        true
      );
    } else {
      renderedvdom = this.renderGenerators(this.$vdom);
      this.$current_vdom = this.renderObject(
        renderedvdom,
        {
          component_uuid: this.component_uuid,
        },
        true
      );
    }
  }

  renderObject(_object, parent_object, is_root) {
    let obj = JSON.parse(JSON.stringify(_object));

    if (typeof obj === "string") {
      return obj;
    } else {
      if (!is_root) {
        obj["parent_component_uuid"] = parent_object["component_uuid"]
          ? parent_object["component_uuid"]
          : parent_object["parent_component_uuid"];
        obj["component_uuid"] = null;
      }

      if (this.$components !== undefined && obj.tag in this.$components) {
        let comp = this.renderComponent(
          obj.tag,
          obj.props,
          obj.children,
          this.component_uuid
        );
        obj = comp.vdom;
        this.methods = {
          ...this.methods,
          ...comp.methods,
        };
        return obj;
      }

      if (obj.props) {
        var arr = Object.keys(obj.props);
        obj["$directives"] = {};
        for (let i = 0; i < arr.length; i++) {
          const prop = arr[i];
          if (prop.startsWith("@")) {
            obj["$directives"][prop] = obj.props[prop];
          }
        }

        obj["$bindings"] = {};
        for (let i = 0; i < arr.length; i++) {
          const prop = arr[i];
          if (prop.startsWith(":")) {
            obj["$bindings"][prop] = obj.props[prop];
          }
        }
      }
      if (obj.tag == "DATA") {
        let value = this.getData(obj.props["k-data"]);
        if (value !== "") {
          obj = String(value);
        }
      } else if (obj.tag == "SLOT") {
        return this.renderObject(this.initIntheritance(this.slots), obj);
      } else {
        let childs = [];
        if (obj.children) {
          for (let i = 0; i < obj.children.length; i++) {
            let output = this.renderObject(obj.children[i], obj);

            if (Array.isArray(output)) {
              childs.push(...output);
            } else {
              childs.push(output);
            }
          }
        }
        obj.children = JSON.parse(JSON.stringify(childs));
      }
    }

    return obj;
  }

  render(parent_component_uuid = null) {
    this.renderVDom();
    if (this._data && !this.data) {
      this.data = onChange(
        {
          ...this._data,
          ...this.$props,
        },
        () => {
          this.render(parent_component_uuid);
          this.self.render();
        }
      );
    }

    if (this.fetchMethod) {
      this.$current_vdom.props = {
        ...this.$current_vdom.props,
        ...this.fetchMethod,
      };
    }

    return {
      vdom: {
        ...this.$current_vdom,
        parent_component_uuid,
        component_uuid: this.component_uuid,
      },
      methods: this.methods,
      mounted: this.mounted,
      updated: this.updated,
    };
  }

  initIntheritance(slots) {
    let slotVDom = Array.isArray(slots) ? slots : [slots];
    if (this.inheritance) {
      for (let i = this.inheritance.length - 1; i > -1; i--) {
        // This part will change after adding base inheritance class
        let vdom = new this.inheritance[i]();
        slotVDom = {
          ...vdom,
          children: Array.isArray(slotVDom) ? slotVDom : [slotVDom],
        };
      }
    }

    return slotVDom;
  }
}
