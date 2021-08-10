export function setCommands(self){
    self.Command.add("storage:load",async function(cb){
        await self.Storage.load();
        cb();
    });

    self.Command.add("storage:store",async function(cb){
        await self.Storage.store();
        cb();
    });

    let static_panels = ["left-side","right-side","nav","status"];
    let float_panels = ["left-pan","right-pan","bot-pan"];

    static_panels.forEach(p => {
        self.Command.add(`panel:${p}:show`,function(){
            self.Panel.show(p);
        });

        self.Command.add(`panel:${p}:hide`,function(){
            self.Panel.hide(p);
        });
    });

    float_panels.forEach(p => {
        self.Command.add(`panel:${p}:open`,function(){
            self.Panel.show(p);
        });

        self.Command.add(`panel:${p}:close`,function(){
            self.Panel.hide(p);
        });
    });
}