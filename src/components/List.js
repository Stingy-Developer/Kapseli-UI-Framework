import { Component } from "./Component";

export class List extends Component{
    constructor(config){

        super({
            data: {
                title: config.title,
                items: config.items
            },
            template: `
            <ul class="list-group" v-for="item in items">
                <li class="list-group-item"><data v-data="item"></data></li>
            </ul>
            `,
            props: [],
            methods: {}
        })
    }
}