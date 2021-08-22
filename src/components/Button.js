import { Component } from "./Component";

export class Button extends Component{
    constructor(icon = null, text = null, command_or_cb = null) {
        super({
            data:{
                icon: icon != "" ? icon : false,
                text: text != "" ? text : "Default Button",
                command_or_cb: command_or_cb
            },
            template:`
            <button class="btn btn-primary" @click="go">
                <i class="material-icons" v-if="icon">
                    <data v-data="icon"></data>
                </i> 
                <span>
                    <data v-data="text"></data>
                </span>
            </button>
            `,
            methods:{
                go: (e) => {
                    if( this.data.command_or_cb ){
                        if( typeof this.data.command_or_cb == "function" ){
                            this.data.command_or_cb(e)
                        }else{
                            // this.data.command_or_cb
                        } 
                    }
                }
            },
            props:{
                text: {},
                icon:{}
            },
            fetchMethod: {
                fetch_mode: "on",
                fetch:{
                    method:"GET",
                    url: "#",
                    opts: {}
                }
            }
        });
        
    }

    css(stylesheet){
        this.props = this._beautyAttr({
            ...this.props,
            style:stylesheet
        });
    }

    disable(bool){
        if(bool){
            this.vdom.props.className =+ " disabled";
        }else{
            this.vdom.props.className.replace("disabled","")
        }
    }

    type(btnType){
        this.vdom.props.type = btnType;
    }

}
