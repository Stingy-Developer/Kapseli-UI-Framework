import { Event } from "../event";
import { KapseliConfig, KapseliProp } from "../types/Kapseli";
import { StorageConfig, StorageManagerConfig } from "../types/Storage";
import { config } from "./config";

export class StorageManager {
  config: KapseliConfig;
  storageConfig: StorageManagerConfig;
  event: Event;
  constructor(conf: KapseliConfig, self: KapseliProp) {
    this.config = conf || {};
    this.storageConfig = this.config.storage
      ? { ...config, ...this.config.storage }
      : { ...config };
    this.event = self.Event;
  }
  getConfig() {
    return this.storageConfig;
  }
  add(label: string, conf: StorageConfig) {
    this.storageConfig.storages[label] = conf;
  }
  get(label: string) {
    if (label in this.storageConfig.storages) {
      return this.storageConfig.storages[label];
    }
  }
  getStorages() {
    return this.storageConfig.storages;
  }
  getCurrent() {
    return this.storageConfig.storages[this.storageConfig.currentStorage];
  }
  setCurrent(label: string) {
    if (label in this.storageConfig.storages) {
      this.storageConfig.currentStorage = label;
    }
  }
  async store(data: any) {
    this.event.run("storage:start", null);
    this.event.run("storage:start:store", null);
    try {
      let d = await this.storageConfig.storages[
        this.storageConfig.currentStorage
      ].store(data);
      this.event.run("storage:store", d);
    } catch (error) {
      this.event.run("storage:error:store", error);
      this.event.run("storage:error", error);
    }
    this.event.run("storage:end:store", null);
    this.event.run("storage:end", null);
  }
  async load(data: any) {
    this.event.run("storage:start", null);
    this.event.run("storage:start:load", null);
    try {
      let d = await this.storageConfig.storages[
        this.storageConfig.currentStorage
      ].load(data);
      this.event.run("storage:load", d);
    } catch (error) {
      this.event.run("storage:error:load", error);
      this.event.run("storage:error", error);
    }
    this.event.run("storage:end:load", null);
    this.event.run("storage:end", null);
  }
}
