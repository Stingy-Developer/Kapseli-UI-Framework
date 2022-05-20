import { StorageManager } from "../storage/index";
import { Command } from "../command/index";
import { I18n } from "../i18n/index";
import { Event } from "../event/index";
import { Plugin } from "../plugin/index";
// import { Route } from "../route/index";
import { VDom } from "../vdom/index";
import { Component } from "../components/Component";

// configs
import { setCommands } from "./configs/command";
import { setEvents } from "./configs/event";
import { defaultConfig } from "./configs/default";
import { setProvider } from "./configs/provider";
import { command2method } from "./configs/command2method";
import { KapseliProp } from "../types/Kapseli";

export const Kapseli: KapseliProp = {
  plugins: new Plugin(),
  Event: null,
  I18n: null,
  Storage: null,
  Command: null,
  Route: null,
  View: null,
  init(configs) {
    let config = configs
      ? {
          ...defaultConfig,
          ...configs,
        }
      : defaultConfig;
    this.Event = new Event(config.event ? config.event : {});
    this.I18n = new I18n(config.i18n ? config.i18n : {}, this);
    this.Storage = new StorageManager(
      config.storage ? config.storage : {},
      this
    );
    this.Command = new Command(config.command ? config.command : {}, this);
    // this.Route = new Route(config.route ? config.route : {}, this);
    setEvents(this);
    setCommands(this);

    this.View = new VDom(
      config.view
        ? {
            ...config.view,
            methods: {
              ...config.view.methods,
              ...command2method(this.Command),
            },
          }
        : {},
      this
    );

    setProvider(this);

    if (config.plugins) {
      let plgs = config.plugins;
      for (let i = 0; i < plgs.length; i++) {
        if (plgs[i] in this.plugins.plugins) {
          if (config.version !== "production") {
            try {
              this.plugins.plugins[plgs[i]](
                this,
                plgs[i] in config.pluginOpts ? config.pluginOpts[plgs[i]] : {}
              );
            } catch (error) {
              console.error(`PluginError: '${plgs[i]}' Plugin => ${error}`);
            }
          } else {
            this.plugins.plugins[plgs[i]](
              this,
              plgs[i] in config.pluginOpts ? config.pluginOpts[plgs[i]] : {}
            );
          }
        } else {
          console.error(
            `PluginError: '${plgs[i]}' Plugin => This plugin is not registered!`
          );
        }
      }
    }
    this.Event.run("app:init");
    return this;
  },

  store(data) {
    this.Storage.store(data);
  },

  load(data) {
    this.Storage.load(data);
  },

  render() {
    this.View.render();

    // router init
    // var routers = [].slice.call(document.querySelectorAll("[data-route]"));
    // routers.forEach((router) => {
    //   if (router) {
    //     if (!this.Route.hasRoute(router.getAttribute("data-route"))) {
    //       console.error(
    //         `RouterError: '${router.getAttribute(
    //           "data-route"
    //         )}' route is not registered!`
    //       );
    //     }
    //   }
    // });
  },

  refresh(configs) {
    this.init(configs);
    this.render();
  },

  on(name, cb) {
    if (name && typeof cb == "function") {
      this.Event.on(name, cb);
    } else {
      console.log(`This is not valid event connection for ${name}!`);
    }
  },

  once(name, cb) {
    if (name && typeof cb == "function") {
      this.Event.on(name, (args) => {
        cb(args);
        this.Event.remove(name);
      });
    } else {
      console.log(`This is not valid event connection for ${name}!`);
    }
  },

  off(name) {
    this.Event.remove(name);
  },

  setLocale(l) {
    this.I18n.setLocale(l);

    this.Event.run("app:locale", l);
    this.render();
  },
  Component: Component,
};
