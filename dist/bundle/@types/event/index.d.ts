import { EventFunc, EventProp } from "../types/Event";
export declare class Event {
    event: EventProp;
    constructor(config: EventProp);
    register(name: string): void;
    run(name: string, args: any): boolean;
    on(name: string, cb: EventFunc): void;
    get(name: string): false | {
        name: string;
        listeners: EventFunc[];
    };
    getAll(): EventProp;
    remove(name: string): boolean;
}
