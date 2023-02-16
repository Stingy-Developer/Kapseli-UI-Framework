export declare type KapseliNodeTagProp = string;
export declare type KapseliNodePropsProp = {
    [key: string]: string;
};
export declare type KapseliNodeDirectivesProp = {
    [key: string]: any;
};
export interface KapseliNodeProp {
    tag: KapseliNodeTagProp;
    props: KapseliNodePropsProp;
    children: KapseliNodeProp[] | string[];
    $directives?: KapseliNodeDirectivesProp;
    prevTag?: string;
}
