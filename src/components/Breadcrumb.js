import { Component } from "./Component";

export class Breadcrumb extends Component{
    constructor(list) {
        super({
            data:{
                list: list !== undefined ? list : []
            },
            template:`
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" v-for="item in list">
                    <li class="breadcrumb-item" v-if="list.length -1 != item.index"><a :href="item.value.href">
                    <data v-data="item.value.label"></data>
                    </a></li>
                    <li class="breadcrumb-item active" v-if="list.length -1 == item.index">
                    <data v-data="item.value.label"></data>
                    </li>
                </ol>
            </nav>
            `,
            methods:{
            },
            props:{
                list:{
                    edit(v){
                        return v.split(",")
                    }
                }
            }
        });
        
    }

}
