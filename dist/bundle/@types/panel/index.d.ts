declare class Panel {
    config: any;
    panelConfig: any;
    event: any;
    constructor(config: any);
    getAll(): any;
    get(panel_id: string): any;
    setConfig(panel_id: any, config: any): void;
    setView(panel_id: any, view: any): void;
    add(panelID: any, view: any, config: any): void;
    isShow(panel_id: any): any;
    isFloatPanel(panel_id: any): any;
    show(panel_id: any): void;
    hide(panel_id: any): void;
}
export { Panel };
