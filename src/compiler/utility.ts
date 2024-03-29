import { ClassListObjProps, StyleListObjProps } from "../types/Utility";

export const className = (classList_obj: ClassListObjProps) => {
  let enable_classes = [];
  for (const klass in classList_obj) {
    if (Object.hasOwnProperty.call(classList_obj, klass)) {
      const is_enable = classList_obj[klass];
      if (is_enable) {
        enable_classes.push(klass);
      }
    }
  }
  return enable_classes.join(" ");
};

export const style = (style_obj: StyleListObjProps) => {
  let styles = [];
  for (const key in style_obj) {
    if (Object.hasOwnProperty.call(style_obj, key)) {
      styles.push(key + ":" + style_obj[key]);
    }
  }
  return styles.join(";");
};
