import { KapseliNodeProp, KapseliNodePropsProp } from "../types/KapseliNode";
import { KapseliELement } from "../types/View";
import { createElement } from "./createElement";

const replaceWith = (
  el: KapseliELement,
  vnode: KapseliNodeProp | string,
  klass: any
) => {
  if (el !== undefined) {
    el.replaceWith(createElement(vnode, klass));
  }
};

const patchProps = (
  el: Element,
  newProps: KapseliNodePropsProp,
  oldProps: KapseliNodePropsProp
) => {
  if (el !== undefined) {
    if (el.nodeType != 8 && oldProps !== undefined) {
      const skip = new Set();

      for (const oldPropName of Object.keys(oldProps)) {
        if (!oldPropName.startsWith("@")) {
          const newPropValue = newProps[oldPropName];
          if (newPropValue) {
            el.setAttribute(oldPropName, newPropValue);
            skip.add(oldPropName);
          } else {
            el.removeAttribute(oldPropName);
          }
        }
      }

      for (const newPropName of Object.keys(newProps)) {
        if (!skip.has(newPropName) && !newPropName.startsWith("@")) {
          el.setAttribute(newPropName, newProps[newPropName]);
        }
      }
    }
  }
};

const patchChildren = (
  el: Element,
  newNodeChildren: KapseliNodeProp[] | string[],
  oldNodeChildren: KapseliNodeProp[] | string[],
  klass: any
) => {
  if (!newNodeChildren) {
    el.textContent = "";
  } else {
    if (oldNodeChildren) {
      // Interates backwards, so in case a childNode is destroyed, it will not shift the nodes
      // and break accessing by index
      for (let i = oldNodeChildren.length - 1; i >= 0; --i) {
        if (oldNodeChildren[i] != newNodeChildren[i] && el !== undefined) {
          patch(el.children[i], newNodeChildren[i], oldNodeChildren[i], klass);
        }
      }

      for (
        let i = oldNodeChildren.length ?? 0;
        i < newNodeChildren.length;
        ++i
      ) {
        el.appendChild(createElement(newNodeChildren[i], klass));
      }
    }
  }
};

export const patch = (
  el: KapseliELement,
  newNode: KapseliNodeProp | string,
  oldNode: KapseliNodeProp | string,
  klass: any
) => {
  if (newNode === undefined) {
    el.remove();
  } else {
    if (typeof newNode == "string") {
      replaceWith(el, newNode, klass);
    } else {
      if (typeof oldNode != "string" && newNode.tag != oldNode.tag) {
        replaceWith(el, newNode, klass);
      }
      if (typeof oldNode !== "string" && el instanceof Element) {
        patchProps(el, newNode.props, oldNode.props);

        patchChildren(el, newNode.children, oldNode.children, klass);
      }
    }
  }
};
