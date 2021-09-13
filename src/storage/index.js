const { config } = require("./config");

class StorageManager {
  constructor(conf, self) {
    this.config = conf || {};
    this.storageConfig = this.config.storage
      ? { ...config, ...this.config.storage }
      : { ...config };
    this.event = self.Event;
  }
  getConfig() {
    return this.storageConfig;
  }
  add(label, conf) {
    this.storageConfig["storages"][label] = conf;
  }
  get(label) {
    if (label in this.storageConfig["storages"]) {
      return this.storageConfig["storages"][label];
    }
  }
  getStorages() {
    return this.storageConfig["storages"];
  }
  getCurrent() {
    return this.storageConfig["storages"][this.storageConfig["currentStorage"]];
  }
  setCurrent(label) {
    if (label in this.storageConfig["storages"]) {
      this.storageConfig["currentStorage"] = label;
    }
  }
  async store(data) {
    this.event.run("storage:start");
    this.event.run("storage:start:store");
    try {
      let d = await this.storageConfig["storages"][
        this.storageConfig["currentStorage"]
      ].store(data);
      this.event.run("storage:store", d);
    } catch (error) {
      this.event.run("storage:error:store", error);
      this.event.run("storage:error", error);
    }
    this.event.run("storage:end:store");
    this.event.run("storage:end");
  }
  async load(data) {
    this.event.run("storage:start");
    this.event.run("storage:start:load");
    try {
      let d = await this.storageConfig["storages"][
        this.storageConfig["currentStorage"]
      ].load(data);
      this.event.run("storage:load", d);
    } catch (error) {
      this.event.run("storage:error:load", error);
      this.event.run("storage:error", error);
    }
    this.event.run("storage:end:load");
    this.event.run("storage:end");
  }
}

export { StorageManager };
