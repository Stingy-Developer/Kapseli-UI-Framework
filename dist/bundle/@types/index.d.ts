import { Obj } from "./vdom/jsx";
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
declare const _default: {
    plugins: import("./plugin").Plugin;
    Event: import("./event").Event;
    I18n: import("./i18n").I18n;
    Storage: import("./storage").StorageManager;
    Route: any;
    Command: import("./command").Command;
    View: any;
    init: (configs: import("./types/Kapseli").KapseliConfig) => KapseliProp;
    refresh: (configs: import("./types/Kapseli").KapseliConfig) => void;
    store: (data: any) => void;
    load: (data: any) => void;
    render: () => void;
    on: (name: string, cb: (args: any) => void) => void;
    once: (name: string, cb: (args: any) => void) => void;
    off: (name: string) => void;
    setLocale: (l: string) => void;
    Component: new (conf: import("./types/Component").KapseliComponentConfigProp) => import("./components/Component").Component;
};
export default _default;
