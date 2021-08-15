import { Component } from "./Component";

export class Alert extends Component{
    constructor(type,content) {
        super({
            data:{
                content: content != "" ? content : "This is an alert!"
            },
            template:`
            <div class="alert alert-${type}" role="alert">
                <data v-data="content"></data>
            </div>
            `,
            methods:{
            },
            props:["content"]
        });
        
    }

}
