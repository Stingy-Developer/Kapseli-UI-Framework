import { Component } from "../components/Component";
import { Plugin } from "../plugin/index";
import { Command } from "../command/index";
import { Event } from "../event";
import { I18n } from "../i18n";
import { StorageManager } from "../storage";
import { KapseliComponentConfigProp } from "./Component";

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
  Component: { new (conf: KapseliComponentConfigProp): Component };
}
