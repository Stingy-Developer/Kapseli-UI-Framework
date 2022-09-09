import { KapseliProp } from "../types/Kapseli";
declare type PluginProps = (kapseli: KapseliProp, pluginOpts: any) => void;
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
export {};
