import { Component } from "./Component";
import "bootstrap/js/dist/offcanvas"
import Offcanvas from "bootstrap/js/dist/offcanvas";


class FloatPanel extends Component{
    constructor(location = "start",cb) {
        let id = Math.random().toString(36).substring(2,7);        
        super({
            data:{
                location: location,
                title: "Panel Title"
            },
            template:`
            <div class="panel panel-${location}" tabindex="-1" id="${id}">
                <div class="panel-header">
                    <h5 class="panel-title">
                        <data v-data="title"></data>
                    </h5>
                    <button type="button" class="btn-close text-reset" aria-label="Close" @click="panel_hide"></button>
                </div>
                <div class="panel-body small">
                    ${cb()}
                </div>
            </div>
            `,
            methods:{
                panel_hide:() => {
                    this.$options.hide();
                }
            },
            props:{
                title:{}
            },
            mounted: () => {
                this.$options = new Offcanvas(
                    document.getElementById(id)
                );
            }
        });
    }
}


class StaticPanel extends Component{
    constructor(location = "start",uri,body_cb,footer_cb) {
        super({
            data:{
                location: location,
                title: "Panel Title",
                is_footer: typeof footer_cb === "function",
                is_body: typeof body_cb === "function",
            },
            template:`
            <div class="static-panel static-panel-${location}">
                <a class="static-panel-header" href="${uri}">
                    <img src="https://avatars.githubusercontent.com/u/59289764?s=60&v=4" alt="">
                    <span class="static-panel-title">
                        <data v-data="title"></data>
                    </span>
                </a>
                <hr>
                <div v-if="is_body">
                ${typeof body_cb === "function" ? body_cb() : ""}
                </div>
                <div class="static-panel-footer" v-if="is_footer">
                    <hr>
                    ${typeof footer_cb === "function" ? footer_cb() : ""}
                </div>
            </div>
            `,
            methods:{
            },
            props:{
                title:{}
            },
        });
    }
}



export {
    FloatPanel,StaticPanel
}