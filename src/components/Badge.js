import { Component } from "./Component";

export class Badge extends Component{
    constructor(type,content) {
        super({
            data:{
                content: content != "" ? content : "Badge"
            },
            template:`
            <div class="badge badge-${type}">
                <data v-data="content"></data>
            </div>
            `,
            methods:{
            },
            props:{
                content: {}
            }
        });
        
    }

}
