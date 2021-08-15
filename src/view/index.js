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

    render(config){
        let c = {
            el: "#app",
            ...config
        };

        if(!this.$vdom){
            this.$vdom = new VDom(c)
        }
        this.$vdom.render();
    }



}
