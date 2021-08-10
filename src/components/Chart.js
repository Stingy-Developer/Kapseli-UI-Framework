import { Chart } from "chart.js";
import { Component } from "./Component";

export class ChartComponent extends Component{
    constructor(type,data,options){
        this.el = Math.random().toString(16).substr(2, 8);
        this.type = type || "line";
        this.data = data;
        this.config = {
            type: this.type,
            data: this.data,
            options: options || {}
        };
        this.vdom = {
            tag: 'canvas',
            props: {
                id: this.el
            },
            children: []
        }
    }

    css(stylesheet){
        this.vdom.props.style = stylesheet || '';
    }

    setType(type){
        this.config.type = type || 'line';
    }

    setData(config){
        this.config.data = config.data || {};
        this.config.options = config.options || {};
    }

    chartRender(){
        let ctx = document.getElementById(this.el);
        this.chart = new Chart(
            ctx,
            this.config
        );
        
    }
}