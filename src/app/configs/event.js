export function setEvents(self){
    // panels
    let panels_id = ["left-pan","right-pan","left-side","right-side","status","nav","bot-pan"];

    panels_id.forEach(panelID => {
        self.Event.register(`panel:${panelID}:show`);
        self.Event.register(`panel:${panelID}:hide`);
        self.Event.register(`panel:${panelID}:show:before`);
        self.Event.register(`panel:${panelID}:hide:before`);
        self.Event.register(`panel:${panelID}:show:after`);
        self.Event.register(`panel:${panelID}:hide:after`);
    });

    // routes
    self.Event.register("route:open");
    self.Event.register("route:prev");
    self.Event.register("route:next");

    // storage
    self.Event.register("storage:load");
    self.Event.register("storage:store");

    ["start","end","error"].forEach(l => {
        self.Event.register(`storage:${l}`);
        self.Event.register(`storage:${l}:load`);
        self.Event.register(`storage:${l}:store`);
    });

    // app
    ["init","render","refresh","locale"].forEach(l => {
        self.Event.register(`app:${l}`);
    });

    //i18n
    ["add","update","locale"].forEach(l => {
        self.Event.register(`i18n:${l}`);
    });
}