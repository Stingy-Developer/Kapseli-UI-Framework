export class Plugin{
    constructor(){
        this.plugins = {};
    }
    add(name,plugin){
        if(name){
            this.plugins[name] = plugin;
        }
    }
    remove(name){
        if(name){
            delete this.plugins[name];
        }
    }
    getAll(){
        return this.plugins;
    }
};
