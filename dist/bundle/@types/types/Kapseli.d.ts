import type { Component } from "../components/Component";
import type { Plugin } from "../plugin/index";
import type { Command } from "../command/index";
import type { Event } from "../event";
import type { I18n } from "../i18n";
import type { StorageManager } from "../storage";
import type { KapseliComponentConfigProp } from "./Component";
import { VDom } from "../vdom";
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
    View: VDom;
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
