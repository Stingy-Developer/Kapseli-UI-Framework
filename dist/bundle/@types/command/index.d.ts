import { KapseliProp } from "../types/Kapseli";
interface CommandProp {
    run: (args: any) => void;
    stop?: (args: any) => void;
}
interface CommandConfigProp {
    [key: string]: CommandProp;
}
export declare class Command {
    config: any;
    commands: CommandConfigProp;
    states: {
        [key: string]: boolean;
    };
    event: any;
    constructor(config: CommandConfigProp, self: KapseliProp);
    add(command: string, config: CommandProp): void;
    has(command: string): boolean;
    get(command: string): false | CommandProp;
    getAll(): CommandConfigProp;
    run(command: string, args: any): boolean;
    stop(command: string, args: any): boolean;
    isActive(command: string): boolean;
    getActives(): any[];
}
export {};
