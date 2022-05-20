export type KapseliNodeTagProp = string;
export type KapseliNodePropsProp = {
  [key: string]: string;
};

export type KapseliNodeDirectivesProp = {
  [key: string]: any;
};

export interface KapseliNodeProp {
  tag: KapseliNodeTagProp;
  props: KapseliNodePropsProp;
  children: KapseliNodeProp[] | string[];
  $directives?: KapseliNodeDirectivesProp;
  prevTag?: string;
}
