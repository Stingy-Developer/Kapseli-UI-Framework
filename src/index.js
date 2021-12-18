/*!
 * Kapseli Framework v1.0.6 pre-production
 * Copyright 2021 Stingy Developer
 * Licensed under MIT
 */

window.jsx = (tag, props, ...children) => {
  if (tag == "fragment") return children;
  for (const prop in props) {
    if (Object.hasOwnProperty.call(props, prop)) {
      const prop_value = props[prop];

      if (prop.startsWith("on")) {
        props[prop.replace("on", "@")] = prop_value;
        delete props[prop];
      }
    }
  }
  return {
    tag: tag.toUpperCase(),
    props: props ? props : {},
    children,
  };
};

import { Kapseli } from "./app/app";

export default {
  init(cfg) {
    return Kapseli.init(cfg);
  },
};
