export interface Obj {
  [key: string]: any;
}

export const JSX = {
  createElement: (
    tag: string,
    props: Obj,
    ...children: Obj[]
  ): { tag: string; props: Obj; children: Obj[] } | Obj[] => {
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
  },
};

export default JSX;
