import { Obj } from "./vdom/jsx";
declare global {
    interface Window {
        jsx: (tag: string, props: Obj, ...children: Obj[]) => {
            tag: string;
            props: Obj;
            children: Obj[];
        } | Obj[];
    }
}
export { Kapseli } from "./app/app";
