export declare type EventFunc = (args: any) => void;
export interface EventProp {
    [key: string]: EventFunc[];
}
