import type { KapseliNodeProp } from "./KapseliNode";
export interface KapseliDirectiveObj {
    render: (el: Element, cb: (e: Event) => void) => void;
}
export interface KapseliDirective {
    [key: string]: KapseliDirectiveObj;
}
export declare type KapseliGeneretorFunc = (expression: string, vdom: KapseliNodeProp, self: any) => void;
export interface KapseliGeneretorObj {
    [key: string]: KapseliGeneretorFunc;
}
export interface KapseliMethods {
    [key: string]: {
        [key: string]: (...args: any[]) => void;
    };
}
export interface KapseliMethodObj {
    [key: string]: (...args: any[]) => void;
}
export interface KapseliComponentObj {
    [key: string]: any;
}
export declare type KapseliELement = Element | Comment;
