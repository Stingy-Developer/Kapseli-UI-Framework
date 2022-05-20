import { KapseliProp } from "../types/Kapseli";

type PluginProps = (kapseli: KapseliProp, pluginOpts: any) => void;

interface PluginObjProps {
  [key: string]: PluginProps;
}

export class Plugin {
  plugins: PluginObjProps;
  constructor() {
    this.plugins = {};
  }
  add(name: string, plugin: PluginProps) {
    if (name) {
      this.plugins[name] = plugin;
    }
  }
  remove(name: string) {
    if (name) {
      delete this.plugins[name];
    }
  }
  getAll() {
    return this.plugins;
  }
}
