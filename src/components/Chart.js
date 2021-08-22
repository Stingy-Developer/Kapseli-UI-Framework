import { Component } from "./Component";

export class ChartComponent extends Component{
    constructor(config) {
        let chart_id = Math.random().toString(36).substring(2,7);
        super({
            data:{
                chart_id: chart_id,
                config: config
            },
            template:`
            <canvas :id="chart_id"></canvas>
            `,
            methods:{
            },
            props:{
                content: {}
            },
            mounted:() => {
                this.chartRender( this.data.chart_id,config );
            }
        });
        
    }

    chartRender(el,config){
        if(window.Chart !== undefined){
            this.data.chart = new Chart(
                document.getElementById(el),
                config
            );
        }else{
            console.error("THis component needs Chart.js to work!");
        }
        
        
    }

}









