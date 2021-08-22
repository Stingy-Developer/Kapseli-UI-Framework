import { StorageManager } from "../storage/index";
import { Command } from "../command/index";
import { I18n } from "../i18n/index";
import { Data } from "../data/index";
import { Event } from "../event/index";
import { Panel } from "../panel/index";
import { Plugin } from "../plugin/index";
import { Route } from "../route/index";
import { VDom } from "../vdom";

// configs
import { setCommands } from "./configs/command";
import { setEvents } from "./configs/event";

const Kapseli = {
    plugins: new Plugin(),
    init(configs){
        let config = configs ? configs : {};
        this.Storage = new StorageManager( config.storage ?  config.storage :  {} );
        this.Command = new Command( config.command ? config.command : {} );
        this.I18n = new I18n( config.i18n ? config.i18n : {} );
        this.Event = new Event( config.event ? config.event : {} );
        this.Route = new Route( config.route ? config.route : {} );
        this.View = new VDom( config.view ? config.view : {} );
   

        
        setCommands(this);
        setEvents(this);

        return this;
    },

    store(data){
        this.Storage.store(data);
    },

    load(data){
        this.Storage.load(data);
    },

    render(){
        this.View.render();

        // router init
        var routers = [].slice.call(document.querySelectorAll('[data-route]'))
        routers.map(function (router) {
            if(router && router.attributes){
                if(!this.Route.hasRoute(router.attributes["data-route"])){
                    console.error(`RouterError: '${router.attributes["data-route"]}' route is not registered!`)
                }
            }
          
        })
    },

    refresh(configs){
        this.init(configs);
        this.render();
    },

    on(name,cb){
        if( name && typeof cb == "function"){
            this.Event.register(name,cb);
        }else{
            console.log(`This is not valid event connection for ${name}!`)
        }
    },

    once(name,cb){
        if( name && typeof cb == "function"){
            this.Event.register(name,
                (args) => {
                    cb(args);
                    this.Event.remove(name);
                });
        }else{
            console.log(`This is not valid event connection for ${name}!`)
        }
    },

    off(name){
        this.Event.remove(name);
    },

    setLocale(l){
        this.I18n.setLocale(l);
    }

    
}

export { Kapseli }