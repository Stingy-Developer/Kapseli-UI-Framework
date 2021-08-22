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
        this.$generators = {};
        this.methods = config.methods ? config.methods : {};
        this.notListenedData = {};
        this.$components = {};
        this._data = config.data || {};

        let el = document.createElement("div");
        el.innerHTML = config.template;
        this.el = el.firstElementChild;
        setVFor(this);
        setVIf(this);
    }

    init(self,props){
        this.self = self;
        this.renderProps(props);
    }

    getData(key_str){
        let data = this.data ? this.data : this._data;
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
                            return "";   
                        }
                    }
                    return nlistdata;
                }

            } catch (error) {
                return "";   
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
                    if( temp_val !== undefined ){
                        prop_val = temp_val;

                    }else if("edit" in this.props[key]){
                        prop_val = this.props[key].edit(prop_val);
                    }
                    
                    
                    this.$props[key] = prop_val;
                    this._data[key] = prop_val;
                }
            }
        }
    }

    renderVDom(){
        let renderedvdom = false;
        if(!this.app){
            this.$vdom = this._getVdom(this.el);
            renderedvdom = this.renderGenerators(this.$vdom);
            renderedvdom = this.renderBindings(renderedvdom);

            this.$current_vdom = this.renderObject(renderedvdom);
        }else{
            renderedvdom = this.renderGenerators(this.$vdom);
            this.$current_vdom = this.renderObject(renderedvdom);
        }

    }

    render(){
        
        this.$components = self.$components;
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