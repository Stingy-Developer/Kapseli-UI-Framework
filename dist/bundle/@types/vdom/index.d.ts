import { KapseliProp } from "../types/Kapseli";
import { Event } from "../event";
import { KapseliComponentObj, KapseliDirective, KapseliDirectiveObj, KapseliGeneretorFunc, KapseliGeneretorObj, KapseliMethods } from "../types/View";
import { KapseliNodeProp, KapseliNodePropsProp } from "../types/KapseliNode";
declare class VDom {
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
