export interface Obj {
    [key: string]: any;
}
export declare const JSX: {
    createElement: (tag: string, props: Obj, ...children: Obj[]) => Obj[] | {
        tag: string;
        props: Obj;
        children: Obj[];
    };
};
export default JSX;
