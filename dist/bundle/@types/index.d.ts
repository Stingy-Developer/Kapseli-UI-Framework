import { Obj } from "./vdom/jsx";
import { Kapseli } from "./app/app";
declare global {
    interface Window {
        Kapseli: KapseliProp;
        jsx: (tag: string, props: Obj, ...children: Obj[]) => {
            tag: string;
            props: Obj;
            children: Obj[];
        } | Obj[];
    }
}
import { KapseliProp } from "./types/Kapseli";
export { Kapseli };
