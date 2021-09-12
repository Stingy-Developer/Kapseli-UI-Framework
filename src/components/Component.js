import { VDom } from "../vdom/index";
import { setVFor } from "../vdom/generators/v-for";
import { setVIf } from "../vdom/generators/v-if";
import onChange from "on-change";

export class Component extends VDom{
    constructor(conf){
        super({});
        let config = {
            props: [],
            methods: {},
            data: {},
            template: "",
            fetchMethod: false,
            mounted: () => {},
            ...conf
        };

        this.fetchMethod = config.fetchMethod ? {
            "data-kapseli-fetch-mode": config.fetchMethod.fetch_mode ? "on" : "off",
            "data-kapseli-fetch-method": config.fetchMethod.fetch.method,
            "data-kapseli-fetch-url": config.fetchMethod.fetch.url,
            "data-kapseli-fetch-opts": JSON.stringify( config.fetchMethod.fetch.opts )
        } : false;

        this.mounted = config.mounted;
        this.props = config.props ? config.props : [];
        this.$props = {};
        this.$directives = {};
        this.methods = config.methods ? config.methods : {};
        this.notListenedData = {};
        this.$components = {};
        this._data = config.data || {};

        if( typeof config.template === "string" ){
            let el = document.createElement("div");
            el.innerHTML = config.template;
            this.el = el.firstElementChild;
        }else if( typeof config.template === "object" ){
            this.el = config.template;
            //this._beautyVdom(this.el);
        }
        
    }

    init(self,props,children){
        this.self = self;
        this.renderProps(props);
        this.slots = children;
    }

    _beautyVdom(vdom){
        let newVDOM = {
            tag: vdom.tag,
            props: {},
            children: []
        }
        if(vdom && typeof vdom !== "string"){
            newVDOM.props = this._beautyAttrForJSX( vdom.props );

            for (let i = 0; i < vdom.children.length; i++) {
                newVDOM.children.push( this._beautyVdom( vdom.children[i] ) )
            }
        }

        return newVDOM;

    }

    getData(key_str){
        let data = this.data ? this.data : this._data;
       

        if( key_str === undefined ){
            return data;
        }
        // data will translate
        if( key_str.startsWith("t:") ){
            return this.klass.I18n.t( key_str.substring(2) )
        } 

        let array = key_str.split(".");

        for (let i = 0; i < array.length; i++) {
            try {
                data = data[ array[i] ];

                if(data === undefined){
                    let nlistdata = this.notListenedData;
                    let nlistarray = key_str.split(".");

                    for (let i = 0; i < nlistarray.length; i++) {
                        try {
                            nlistdata = nlistdata[ nlistarray[i] ];

                        } catch (error) {
                            return false;   
                        }
                    }
                    return nlistdata;
                }

            } catch (error) {
                return false;   
            }
        }

        return data;
    }


    renderProps(props){
        for (const key in props) {
            if (Object.hasOwnProperty.call(props, key)) {
                let prop_val = props[key];
                if(key in this.props){
                    var temp_val = this.self.getData(prop_val); 
                    if( temp_val ){
                        prop_val = temp_val;

                    }else if("edit" in this.props[key]){
                        prop_val = this.props[key].edit(prop_val);
                    }
                    
                    this.notListenedData[key] = prop_val;
                }
            }
        }
    }

    renderVDom(){
        let renderedvdom = false;
        if(!this.app){
            
            try {
                if( this.el instanceof HTMLElement){
                    this.$vdom = this._getVdom(this.el);
                }else{
                    this.$vdom = this._beautyVdom(this.el);
                }
            } catch (error) {
                console.error(`Compiling Error=> ${error}`);
            }     
            
            renderedvdom = this.renderGenerators(this.$vdom);
            renderedvdom = this.renderBindings(renderedvdom);

            this.$current_vdom = this.renderObject(renderedvdom);
        }else{
            renderedvdom = this.renderGenerators(this.$vdom);
            this.$current_vdom = this.renderObject(renderedvdom);
        }

    }

    
    renderObject(_object){
        let obj = JSON.parse(JSON.stringify(_object));
        if(this.$components !== undefined && obj.tag in this.$components){
            let comp = this.renderComponent(obj.tag,obj.props,obj.children);
            obj = comp.vdom;
            this.methods = {
                ...this.methods,
                ...comp.methods
            };
            this.mounted.push(comp.mounted);
        }
        
        if(obj.props){
            var arr = Object.keys( obj.props );
            obj["$directives"] = {};
            for (let i = 0; i < arr.length; i++) {
                const prop = arr[i];
                if(prop.startsWith("@")){
                    obj["$directives"][prop] = obj.props[prop];
                }
            }

            obj["$bindings"] = {};
            for (let i = 0; i < arr.length; i++) {
                const prop = arr[i];
                if(prop.startsWith(":")){
                    obj["$bindings"][prop] = obj.props[prop];
                }
            }
        
        }
        
        if(obj.tag == "DATA"){
            let value = this.getData( obj.props["v-data"] );
            if(value !== ""){
                obj = String(value);
            }
        }else if( obj.tag == "SLOT" ){
            
            return this.slots;
        }else if( typeof obj === "string" ){
            obj = obj;
        }else{
            let childs = [];
            for (let i = 0; i < obj.children.length; i++) {
                let output = this.renderObject( obj.children[i] );

                if( Array.isArray(output) ){
                    childs.push( ...output );
                }else{
                    childs.push(output);
                }
                
            }
            obj.children = JSON.parse(JSON.stringify(childs));
        }
        
        return obj;
    }

    render(){
        
        this.$components = this.self.$components;
        this.renderVDom();
        if( this._data && !this.data ){
            this.data = onChange(
                {
                    ...this._data,
                    ...this.$props
                },() => {
                this.render(this.self);
                this.self.render()
            });
        }

        if(this.fetchMethod){
            this.$current_vdom.props = {
                ...this.$current_vdom.props,
                ...this.fetchMethod
            };
        }

        return {
            vdom:this.$current_vdom,
            methods:this.methods,
            mounted: this.mounted
        };

    }
}