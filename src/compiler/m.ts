import {
  KapseliNodeDirectivesProp,
  KapseliNodeProp,
  KapseliNodePropsProp,
  KapseliNodeTagProp,
} from "../types/KapseliNode";

export const m = (
  tag: KapseliNodeTagProp,
  props: KapseliNodePropsProp,
  children: KapseliNodeProp[] | string[],
  $directives: KapseliNodeDirectivesProp
): KapseliNodeProp => {
  return { tag, props, children, $directives };
};
