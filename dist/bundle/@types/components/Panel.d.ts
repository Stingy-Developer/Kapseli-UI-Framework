import { Component } from "./Component";
export interface FloatPanelProp {
    id: string;
    location?: string;
    title: string;
}
export interface StaticPanelProp {
    id: string;
    location?: string;
    title: string;
    uri: string;
}
export declare class FloatPanel extends Component {
    $options: any;
    constructor({ location, id, title }: FloatPanelProp);
}
export declare class StaticPanel extends Component {
    constructor({ location, title, id, uri }: StaticPanelProp);
}
