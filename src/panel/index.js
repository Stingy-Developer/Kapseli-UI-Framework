class Panel {
  constructor(config) {
    this.config = config;
    this.panelConfig = config.panel ? config.panel : {};
    this.event = config.Event;
  }

  getAll() {
    return this.panelConfig;
  }

  get(panel_id) {
    return panel_id in this.panelConfig ? this.panelConfig[panel_id] : false;
  }

  setConfig(panel_id, config) {
    if (panel_id in this.panelConfig) {
      this.panelConfig[panel_id].config = {
        ...this.panelConfig[panel_id].config,
        ...config,
      };
    }
  }

  setView(panel_id, view) {
    if (panel_id in this.panelConfig) {
      this.panelConfig[panel_id].view = view;
    }
  }

  add(panel_id, view, config) {
    this.panelConfig[panel_id] = {
      view: view ? view : false,
      config: config
        ? {
            show: false,
            float: false,
            scrollable: false,
            heigth: "auto",
            width: "auto",
            ...config,
          }
        : {
            show: false,
            float: false,
            scrollable: false,
            heigth: "auto",
            width: "auto",
          },
    };
    this.event.register(`panel:${panelID}:show`);
    this.event.register(`panel:${panelID}:hide`);
    this.event.register(`panel:${panelID}:show:before`);
    this.event.register(`panel:${panelID}:hide:before`);
    this.event.register(`panel:${panelID}:show:after`);
    this.event.register(`panel:${panelID}:hide:after`);
  }

  isShow(panel_id) {
    return panel_id in this.panelConfig
      ? this.panelConfig[panel_id].config.show
      : false;
  }

  isFloatPanel(panel_id) {
    return panel_id in this.panelConfig
      ? this.panelConfig[panel_id].config.float
      : false;
  }

  show(panel_id) {
    let panel = this.get(panel_id);
    if (panel) {
      panel.config.show = true;
      this.config.event.run(`panel:${panel_id}:show:before`, panel);
      panel.view.show(this.config);
      this.config.event.run(`panel:${panel_id}:show:after`, panel);
    }
  }

  hide(panel_id) {
    let panel = this.get(panel_id);
    if (panel) {
      panel.config.show = false;
      this.config.event.run(`panel:${panel_id}:hide:before`, panel);
      panel.view.hide(this.config);
      this.config.event.run(`panel:${panel_id}:hide:after`, panel);
    }
  }
}

export { Panel };
