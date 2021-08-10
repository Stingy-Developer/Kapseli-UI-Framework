import { Button } from "./Button";
import { ChartComponent } from "./Chart";
import { Collapse } from "./Collapse";
import { List } from "./List";

export function getComponents(){
    return {
        button: Button,
        chart: ChartComponent,
        collapse: Collapse,
        list: List
    }
}