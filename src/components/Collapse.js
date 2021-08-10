import { Component } from "./Component";

export class Collapse extends Component{
    constructor(config){
        this.title = config.title;
        this.items = config.items;
    }

}