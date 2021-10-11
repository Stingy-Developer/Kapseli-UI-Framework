import { createElement } from "./createElement";

const replaceWith = (el, vnode, klass) => {
  if (el !== undefined) {
    el.replaceWith(createElement(vnode, klass));
  }
};

const patchProps = (el, newProps, oldProps) => {
  if (el !== undefined) {
    if (el.nodeType != 8) {
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

const patchChildren = (el, newNodeChildren, oldNodeChildren, klass) => {
  if (!newNodeChildren) {
    el.textContent = "";
  } else {
    if (oldNodeChildren) {
      // Interates backwards, so in case a childNode is destroyed, it will not shift the nodes
      // and break accessing by index
      for (let i = oldNodeChildren.length - 1; i >= 0; --i) {
        if (oldNodeChildren[i] != newNodeChildren[i]) {
          patch(
            el.childNodes[i],
            newNodeChildren[i],
            oldNodeChildren[i],
            klass
          );
        }
      }
    }
    for (let i = oldNodeChildren.length ?? 0; i < newNodeChildren.length; ++i) {
      el.appendChild(createElement(newNodeChildren[i], klass));
    }
  }
};

const patch = (el, newNode, oldNode, klass) => {
  if (!newNode) {
    el.remove();
  } else {
    if (typeof newNode == "string") {
      replaceWith(el, newNode, klass);
    } else {
      if (newNode.tag != oldNode.tag) {
        replaceWith(el, newNode, klass);
      }
      patchProps(el, newNode.props, oldNode.props);

      patchChildren(el, newNode.children, oldNode.children, klass);
    }
  }
};

export { patch };
