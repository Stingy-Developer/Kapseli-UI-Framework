import { VDom } from "../vdom/index";
import { get,post } from "./helpers/fetch";
import { getComponents } from "../components/index";
const { className, style } = require('million');

export class View {
    constructor(config, modules){
        this.config = config;
        this.components = getComponents();
        this.i18n = modules.i18n;
        this.$dom = false;
        this.spinner =  {
            tag: "DIV",
            props: {
                "className": className(
                    {
                        "spinner-container": true
                    }
                )
            },
            children: [
                {
                    tag: "DIV",
                    props: {
                        "className": className(
                            {
                                "spinner": true,
                                "spinner-grow": true,
                                "spinner-light": true
                            }
                        )
                    },
                    children: []
                }
            ]

        };
    }

    // I18n
    t(m = ""){
        if( m.startsWith("t:") ){
            return this.i18n.t(m);
        }
        return m;
    }

    setContainer(opts){
        this.$dom = {
                tag: "DIV",
                props: {
                    "id": opts.id,
                    "className": className(
                        {
                            "container": !opts.noContainer ? !opts.fluid : false,
                            "container-fluid": !opts.noContainer ? opts.fluid : false
                        }
                    ),
                    "style": opts.style
                },
                children: []
            };
    }

    addRow(options){
        let opts = {
            justify: false,
            ...options
        }
        this.$dom.children.push(
            {
                tag: "DIV",
                props: {
                    "id": opts.id,
                    "className": className(
                        {
                            "row": true,
                            "d-flex": opts.justify,
                            "justify-content-start":opts.justify == "start",
                            "justify-content-center":opts.justify == "center", 
                            "justify-content-end":opts.justify == "end", 
                            "justify-content-between":opts.justify == "between", 
                            "justify-content-around":opts.justify == "around",
                            "spinner-parent": opts.fetch_mode
                        }
                    ),
                    "style": opts.style,
                    "data-kapseli-fetch-mode": opts.fetch_mode ? "on" : "off",
                    "data-kapseli-fetch-method": opts.fetch.method,
                    "data-kapseli-fetch-url": opts.fetch.url,
                    "data-kapseli-fetch-opts": opts.fetch.opts,
                    

                },
                children: opts.fetch_mode ? [
                    this.spinner
                ] : []
            }
        );
    }

    getRow(id){
        for (let i = 0; i < this.$dom.children.length; i++) {
            const row = this.$dom.children[i];
            if( row.props["id"] == id ){
                return this.$dom.children[i];
            }
        }
    }

    setRow(id,row_object){
        for (let i = 0; i < this.$dom.children.length; i++) {
            const row = this.$dom.children[i];
            if( row.props["id"] == id ){
                this.$dom.children[i] = row_object;
                return this.$dom.children[i];
            }
        }
    }

    getComponents(l){
        let comp = this.components[l];
        return comp ? comp : false;
    }

    addComponent(component,parent_row_id){
        let _row = false;
        if( parent_row_id ){
            _row = this.getRow(parent_row_id);
        }else{
            _row = this.$dom.children[ this.$dom.children.length - 1 ];
        }

        _row.children.push(component);
    }

    render(config){
        let c = {
            el: "#app",
            ...config
        };

        if(!this.$vdom){
            this.$vdom = new VDom({
                el: c.el,
                
            })
        }
    }



}
