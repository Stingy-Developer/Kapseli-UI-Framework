import { m, createElement, patch, className, style } from "../compiler/index";
import { setKFor } from "../vdom/generators/k-for";
import { setKIf } from "../vdom/generators/k-if";
import { setKHTML } from "./generators/k-html";
import { setKText } from "./generators/k-text";
import { setKModel } from "./generators/k-model";

import onChange from "on-change";

class VDom {
  constructor(conf, self) {
    this.klass = self !== undefined ? self : {};
    this.event = self !== undefined ? self.Event : {};
    let config = conf ? conf : false;
    this.$directives = {};
    this.$generators = {};
    this.el = config.el ? this.getEl(config.el) : false;
    this.methods = {
      __GLOBAL__: config.methods ? config.methods : {},
    };
    this.notListenedData = {};
    this.$components = {};
    this._component_memo = {};

    if (config.data) {
      this.data = onChange(config.data, () => {
        this.render();
      });
    }

    setKFor(this);
    setKIf(this);
    setKHTML(this);
    setKText(this);
    setKModel(this);
  }

  throwKeyError(key, key_str) {
    if (!key) throw `'${key_str}' property is not defined!`;
  }

  getEl(selector) {
    let el = document.querySelector(selector);

    if (el) {
      return el;
    } else {
      return false;
    }
  }

  __attr_class(classname) {
    let classes = {};
    var d = classname.split(" ");
    for (let i = 0; i < d.length; i++) {
      classes[d[i]] = true;
    }
    return classes;
  }

  __attr_style(style) {
    let styles = {};
    var d = style.split(";");
    for (let i = 0; i < d.length; i++) {
      styles[d[i].split(":")[0]] = d[i].split(":")[1];
    }
    return styles;
  }

  _beautyAttr(attr) {
    var attrs = {};
    attrs["class"] = {};

    if (attr === undefined) return {};

    for (let i = 0; i < attr.length; i++) {
      const at = attr[i];

      if (at.name == "className") {
        let value = this.getData(at.value);
        if (value)
          attrs["class"] = {
            ...(attrs["class"] ? attrs["class"] : {}),
            ...this.__attr_class(value),
          };
      } else if (at.name == "style") {
        attrs["style"] = style(this.__attr_style(at.value));
      } else if (at.name == "class") {
        attrs["class"] = {
          ...this.__attr_class(at.value),
        };
      } else {
        attrs[at.name] = at.value;
      }
    }

    attrs["class"] = className(attrs["class"]);
    if (attrs["class"] == "") delete attrs["class"];

    return attrs;
  }

  _beautyAttrForJSX(attr) {
    var attrs = {};
    attrs["class"] = {};

    if (attr === undefined) return {};
    for (const name in attr) {
      if (Object.hasOwnProperty.call(attr, name)) {
        const value = attr[name];

        if (name == "className") {
          let v = this.getData(value);

          if (v)
            attrs["class"] = {
              ...(attrs["class"] ? attrs["class"] : {}),
              ...this.__attr_class(v),
            };
        } else if (name == "style") {
          attrs["style"] = style(this.__attr_style(value));
        } else if (name == "class") {
          attrs["class"] = {
            ...this.__attr_class(value),
          };
        } else {
          attrs[name] = value;
        }
      }
    }

    attrs["class"] = className(attrs["class"]);
    if (attrs["class"] == "") delete attrs["class"];

    return attrs;
  }

  h(tag, props, children) {
    return { tag, props, children };
  }
  _getVdom(el) {
    let childs = [];
    if (el && el.nodeName != "#text") {
      if (el.childNodes !== undefined) {
        for (let i = 0; i < el.childNodes.length; i++) {
          var element = this._getVdom(el.childNodes[i]);
          childs.push(element);
        }
      }

      return this.h(el.tagName, this._beautyAttr(el.attributes), childs);
    } else {
      return el.data;
    }
  }

  addDirective(id, obj) {
    this.$directives[id] = obj;
  }

  getDirective(id) {
    return this.$directives[id] ? this.$directives[id] : false;
  }

  addComponent(tag, component) {
    this.$components[tag.toUpperCase()] = component;
  }

  getComponent(tag) {
    return this.$components[tag];
  }

  renderComponent(tag, props, children, parentComponent = null) {
    let comp = this.getComponent(tag);
    let component = new comp(props);
    Object.defineProperty(component, "self", {
      value: this,
    });
    Object.defineProperty(component, "klass", {
      value: this.klass,
    });
    Object.defineProperty(component, "$components", {
      value: this.$components,
    });
    component.renderProps(props);
    Object.defineProperty(component, "slots", { value: children });
    if (
      component.use_memo &&
      this._component_memo[component.use_memo] === undefined
    )
      this._component_memo[component.use_memo] = component;
    return component.render(parentComponent);
  }

  _get_data(key_str, ...datas) {
    let first_data = datas[0];

    let data_array = key_str.split(".");

    for (let i = 0; i < data_array.length; i++) {
      try {
        first_data = first_data[data_array[i]];

        if (first_data === undefined && datas.length > 1) {
          return this._get_data(key_str, ...datas.splice(1));
        }
      } catch (error) {
        return false;
      }
    }
    return first_data;
  }

  getData(key_str) {
    let data = this.data;

    // data will translate
    if (key_str !== undefined && key_str.startsWith("t:")) {
      return this.klass.I18n.t(key_str.substring(2));
    }

    return this._get_data(key_str, data, this.notListenedData);
  }

  getMethod(key_str) {
    if (this.methods) {
      if (this.methods[key_str]) return this.methods[key_str];
    } else {
      throw `'${key_str}' property is not defined in 'methods'!`;
    }
  }

  addGenerator(key, cb) {
    this.$generators[key] = cb; //cb(expression,vdom,this)
  }

  getGenerator(key) {
    return this.$generators[key] ? this.$generators[key] : false;
  }

  renderGenerators(_vdom) {
    let vdom = JSON.parse(JSON.stringify(_vdom));
    if (vdom && typeof vdom !== "string") {
      let props = Object.keys(vdom.props);

      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const generator = this.getGenerator(prop);
        if (generator) {
          generator(vdom.props[prop], vdom, this);
        }
      }

      for (let i = 0; i < vdom.children.length; i++) {
        vdom.children[i] = this.renderGenerators(vdom.children[i]);
      }
    }

    return vdom;
  }

  renderBindings(_vdom, shortcut = "bind-") {
    let vdom = JSON.parse(JSON.stringify(_vdom));
    if (vdom && typeof vdom !== "string") {
      let props = Object.keys(vdom.props);

      for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop.startsWith(shortcut)) {
          let bind_value = vdom.props[prop];
          let d_val = this.getData(bind_value);

          if (d_val !== undefined) {
            bind_value = d_val;
          }

          vdom.props[prop.substring(shortcut.length)] = bind_value;
        }
      }

      for (let i = 0; i < vdom.children.length; i++) {
        vdom.children[i] = this.renderBindings(vdom.children[i]);
      }
    }

    return vdom;
  }

  renderVDom() {
    let renderedvdom = false;
    if (!this.app) {
      try {
        if (this.el instanceof HTMLElement) this.$vdom = this._getVdom(this.el);
      } catch (error) {
        this.$vdom = this.el;
      }
      renderedvdom = this.renderGenerators(this.$vdom);
      renderedvdom = this.renderBindings(renderedvdom);
      this.$current_vdom = this.renderObject(renderedvdom);
      this.$current_vdom["component_uuid"] = null;
      this.$current_vdom["parent_component_uuid"] = null;
      this.app = createElement(this.$current_vdom, this, null);
      this.el.parentElement.replaceChild(this.app, this.el);

      for (const id in this._component_memo) {
        if (Object.hasOwnProperty.call(this._component_memo, id)) {
          this._component_memo[id].mounted();
        }
      }
    } else {
      renderedvdom = this.renderGenerators(this.$vdom);
      renderedvdom = this.renderBindings(renderedvdom);

      let vdom = this.renderObject(renderedvdom);
      patch(this.app, vdom, this.$current_vdom, this);
      this.$current_vdom = vdom;

      for (const id in this._component_memo) {
        if (Object.hasOwnProperty.call(this._component_memo, id)) {
          this._component_memo[id].updated();
        }
      }
    }
  }

  renderObject(
    _object,
    parent_object = { component_uuid: null, parent_component_uuid: null }
  ) {
    let obj = JSON.parse(JSON.stringify(_object));
    if (typeof obj === "string") {
      return obj;
    }
    obj["parent_component_uuid"] = parent_object["component_uuid"]
      ? parent_object["component_uuid"]
      : parent_object["parent_component_uuid"];

    if (this.$components !== undefined && obj.tag in this.$components) {
      let comp = this.renderComponent(
        obj.tag,
        obj.props,
        obj.children,
        obj["parent_component_uuid"]
      );

      if (!this.app) {
        this.methods[comp.vdom.component_uuid] = comp.methods;
      }

      obj = comp.vdom;
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
    } else if (typeof obj !== "string") {
      for (let i = 0; i < obj.children.length; i++) {
        obj.children[i] = this.renderObject(obj.children[i], obj);
      }
    }

    return obj;
  }

  render() {
    this.renderVDom();
    this.notListenedData = {};
  }
}

VDom.component = VDom.prototype.addComponent;

export { VDom };
