import { VDom } from "../vdom/index";
import { KapseliComponentConfigProp, KapseliFetchMethodProp } from "../types/Component";
import { VoidFunc } from "../types/Utility";
import { KapseliMethodObj } from "../types/View";
import { KapseliNodeProp, KapseliNodePropsProp } from "../types/KapseliNode";
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
