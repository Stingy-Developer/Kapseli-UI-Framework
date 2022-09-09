export declare global {
    interface Window {
        Kapseli: KapseliProp;
        jsx: (tag: string, props: Obj, ...children: Obj[]) => {
            tag: string;
            props: Obj;
            children: Obj[];
        } | Obj[];
    }
}
export declare const _default: {
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

export declare const Kapseli: KapseliProp;

export declare function setCommands(self: KapseliProp): void;


export declare let defaultConfig: {
    plugins: any[];
    pluginOpts: {};
    command: {};
    i18n: {};
    storage: {};
    event: {};
    route: {};
    view: {
        el: string;
        data: {};
        methods: {};
    };
    version: string;
};

export declare function setEvents(self: KapseliProp): void;

export declare function setProvider(self: KapseliProp): void;

export declare const EVENTS: string[];

interface CommandProp {
    run: (args: any) => void;
    stop?: (args: any) => void;
}
interface CommandConfigProp {
    [key: string]: CommandProp;
}
export declare class Command {
    config: any;
    commands: CommandConfigProp;
    states: {
        [key: string]: boolean;
    };
    event: any;
    constructor(config: CommandConfigProp, self: KapseliProp);
    add(command: string, config: CommandProp): void;
    has(command: string): boolean;
    get(command: string): false | CommandProp;
    getAll(): CommandConfigProp;
    run(command: string, args: any): boolean;
    stop(command: string, args: any): boolean;
    isActive(command: string): boolean;
    getActives(): any[];
}

export declare const createElement: (node: KapseliNodeProp | string, klass: any) => Comment | HTMLElement;

export { m, createElement, className, style, patch };

export declare const m: (tag: KapseliNodeTagProp, props: KapseliNodePropsProp, children: KapseliNodeProp[] | string[], $directives: KapseliNodeDirectivesProp) => KapseliNodeProp;

export declare const patch: (el: KapseliELement, newNode: KapseliNodeProp | string, oldNode: KapseliNodeProp | string, klass: any) => void;

export declare const className: (classList_obj: ClassListObjProps) => string;
export declare const style: (style_obj: StyleListObjProps) => string;

export declare class Component extends VDom {
    fetchMethod: KapseliFetchMethodProp;
    mounted: VoidFunc;
    updated: VoidFunc;
    props: string[];
    $props: any;
    component_uuid: string;
    comp_methods: KapseliMethodObj;
    _data: any;
    inheritance: {
        new (): Object;
    }[];
    useMemo: string | false;
    self: VDom;
    slots: string | KapseliNodeProp[];
    constructor(conf: KapseliComponentConfigProp);
    _beautyVdom(vdom: KapseliNodeProp | string): string | {
        tag: string;
        props: {};
        children: any[];
    };
    getData(key_str: string): any;
    renderProps(props: KapseliNodePropsProp): void;
    renderVDom(): void;
    renderObject(_object: any, parent_object: any, is_root?: boolean): any;
    render(parent_component_uuid?: any): {
        vdom: any;
        methods: KapseliMethodObj;
        mounted: VoidFunc;
        updated: VoidFunc;
    };
    initIntheritance(slots: any): any[];
}

export interface FloatPanelProp {
    id: string;
    location?: string;
    title: string;
}
export interface StaticPanelProp {
    id: string;
    location?: string;
    title: string;
    uri: string;
}
export declare class FloatPanel extends Component {
    $options: any;
    constructor({ location, id, title }: FloatPanelProp);
}
export declare class StaticPanel extends Component {
    constructor({ location, title, id, uri }: StaticPanelProp);
}

export declare class Provider extends Component {
    constructor({ stylesheet_url }: {
        stylesheet_url: any;
    });
}

export declare class Data {
    data: any;
    constructor(data: any);
    get(key: string): any;
    set(key: string, value: any): void;
    update(key: string, value: any): void;
    delete(key: string): void;
    has(key: string): boolean;
    dump(): string;
    load(data: any): void;
}

export declare class Event {
    event: EventProp;
    constructor(config: EventProp);
    register(name: string): void;
    run(name: string, args: any): boolean;
    on(name: string, cb: EventFunc): void;
    get(name: string): false | {
        name: string;
        listeners: EventFunc[];
    };
    getAll(): EventProp;
    remove(name: string): boolean;
}

export declare const EVENTS: string[];

export declare class I18n {
    event: Event;
    config: I18nConfigProps;
    constructor(config: I18nConfigProps, self: KapseliProp);
    getConfig(): I18nConfigProps;
    setLocale(locale: I18nLocaleProp): void;
    getLocale(): string;
    getMessages(): {
        [key: string]: I18nMessagesProp;
    };
    setMessages(locale: I18nLocaleProp, messages: I18nMessagesProp): void;
    addMessages(locale: I18nLocaleProp, messages: I18nMessagesProp): void;
    t(id: string): string;
}

export declare const PanelConfig: {
    "left-side": {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    "right-side": {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    "left-pan": {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    "right-pan": {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    nav: {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    status: {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
    "bot-pan": {
        name: string;
        type: string;
        config: {
            show: boolean;
            float: boolean;
            scrollable: boolean;
            heigth: string;
            width: string;
        };
        view: boolean;
    };
};

export declare class Panel {
    config: any;
    panelConfig: any;
    event: any;
    constructor(config: any);
    getAll(): any;
    get(panel_id: string): any;
    setConfig(panel_id: any, config: any): void;
    setView(panel_id: any, view: any): void;
    add(panelID: any, view: any, config: any): void;
    isShow(panel_id: any): any;
    isFloatPanel(panel_id: any): any;
    show(panel_id: any): void;
    hide(panel_id: any): void;
}
export { Panel };

export declare type PluginProps = (kapseli: KapseliProp, pluginOpts: any) => void;
interface PluginObjProps {
    [key: string]: PluginProps;
}
export declare class Plugin {
    plugins: PluginObjProps;
    constructor();
    add(name: string, plugin: PluginProps): void;
    remove(name: string): void;
    getAll(): PluginObjProps;
}

export declare const config: StorageManagerConfig;

export declare class StorageManager {
    config: KapseliConfig;
    storageConfig: StorageManagerConfig;
    event: Event;
    constructor(conf: KapseliConfig, self: KapseliProp);
    getConfig(): StorageManagerConfig;
    add(label: string, conf: StorageConfig): void;
    get(label: string): StorageConfig;
    getStorages(): {
        [key: string]: StorageConfig;
    };
    getCurrent(): StorageConfig;
    setCurrent(label: string): void;
    store(data: any): Promise<void>;
    load(data: any): Promise<void>;
}

export declare type VoidFunc = () => void;
export declare type KapseliFetchMethodProp = {
    "data-kapseli-fetch-mode": "on" | "off";
    "data-kapseli-fetch-method": "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    "data-kapseli-fetch-uri": string;
    "data-kapseli-fetch-opts": string;
} | false;
export interface KapseliComponentConfigProp {
    props?: string[];
    methods?: KapseliMethodObj;
    data?: any;
    template: any;
    fetchMethod?: {
        fetchMode: "on" | "off";
        fetch: {
            uri: string;
            method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
            opts: {
                [key: string]: any;
            };
        };
    } | false;
    mounted?: VoidFunc;
    updated?: VoidFunc;
    inheritances?: {
        new (): Object;
    }[];
    useMemo?: string | false;
}

export declare type EventFunc = (args: any) => void;
export interface EventProp {
    [key: string]: EventFunc[];
}

export interface KapseliConfig {
    event?: any;
    i18n?: any;
    storage?: any;
    command?: any;
    route?: any;
    view?: any;
    plugins?: any;
}
export interface KapseliProp {
    plugins: Plugin;
    Event: Event;
    I18n: I18n;
    Storage: StorageManager;
    Route: any;
    Command: Command;
    View: any;
    init: (configs: KapseliConfig) => KapseliProp;
    refresh: (configs: KapseliConfig) => void;
    store: (data: any) => void;
    load: (data: any) => void;
    render: () => void;
    on: (name: string, cb: (args: any) => void) => void;
    once: (name: string, cb: (args: any) => void) => void;
    off: (name: string) => void;
    setLocale: (l: string) => void;
    Component: {
        new (conf: KapseliComponentConfigProp): Component;
    };
}

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

export interface StorageConfig {
    load: (data: any) => Promise<any>;
    store: (data: any) => Promise<any>;
    options: {
        [key: string]: any;
    };
}
export interface StorageManagerConfig {
    storages: {
        [key: string]: StorageConfig;
    };
    currentStorage: string;
}

export interface ClassListObjProps {
    [key: string]: boolean;
}
export interface StyleListObjProps {
    [key: string]: string;
}
export declare type VoidFunc = () => void;

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

export declare type I18nLocaleProp = string;
export declare type I18nMessagesProp = {
    [key: string]: string;
};
export interface I18nConfigProps {
    locale: I18nLocaleProp;
    messages: {
        [key: string]: I18nMessagesProp;
    };
}

export declare class VDom {
    klass: KapseliProp;
    event: Event | false;
    $directives: KapseliDirective;
    $generators: KapseliGeneretorObj;
    el: Element | KapseliNodeProp | false;
    app: Element | Comment | false;
    methods: KapseliMethods;
    notListenedData: any;
    $components: KapseliComponentObj;
    _component_memo: KapseliComponentObj;
    data: any;
    $vdom: string | KapseliNodeProp;
    $current_vdom: any;
    component: (tag: string, component: any) => void;
    constructor(conf: any, self?: KapseliProp);
    throwKeyError(key: any, key_str: string): void;
    getEl(selector: string): Element;
    __attr_class(classname: string): {};
    __attr_style(style: string): {};
    _beautyAttr(attr: NamedNodeMap): {};
    _beautyAttrForJSX(attr: {
        [key: string]: string;
    }): {};
    h: (tag: string, props: KapseliNodePropsProp, children: string[] | KapseliNodeProp[], $directives: import("../types/KapseliNode").KapseliNodeDirectivesProp) => KapseliNodeProp;
    _getVdom(el: Element | Node): string | KapseliNodeProp;
    addDirective(id: string, obj: KapseliDirectiveObj): void;
    getDirective(id: string): false | KapseliDirectiveObj;
    addComponent(tag: string, component: any): void;
    getComponent(tag: string): any;
    renderComponent(tag: string, props: KapseliNodePropsProp, children: KapseliNodeProp[] | string, parentComponent?: any): any;
    _get_data(key_str: string, ...datas: string[]): any;
    getData(key_str: string): any;
    getMethod(key_str: string): {
        [key: string]: (...args: any[]) => void;
    };
    addGenerator(key: string, cb: KapseliGeneretorFunc): void;
    getGenerator(key: string): false | KapseliGeneretorFunc;
    renderGenerators(_vdom: KapseliNodeProp | string): KapseliNodeProp;
    renderBindings(_vdom: KapseliNodeProp, shortcut?: string): any;
    renderVDom(): void;
    renderObject(_object: any, parent_object?: {
        component_uuid: any;
        parent_component_uuid: any;
    }, is_root?: any): any;
    render(): void;
}
export { VDom };

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

export declare function setKFor(obj: VDom): void;

export declare function setKHTML(obj: VDom): void;

export declare function setKIf(obj: VDom): void;

export declare function setKModel(obj: any): void;

export declare function setKText(obj: VDom): void;
