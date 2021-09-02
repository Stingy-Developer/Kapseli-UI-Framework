import { Component } from "./Component";

export class Alert extends Component{
    constructor(type,content) {
        super({
            data:{
                type: "alert-" + type
            },
            template:
            (<div class="alert" classlist="type" role="alert">
                <slot></slot>
            </div>),
            methods:{
            },
            props:{
                type: {}
            }
        });
        
    }

    setType(type){
        this.data.type = `alert-${type}`
    }

}
