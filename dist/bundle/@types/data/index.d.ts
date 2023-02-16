export declare class Data {
    data: any;
    constructor(data: any);
    get(key: string): any;
    set(key: string, value: any): void;
    update(key: string, value: any): void;
    delete(key: string): void;
    has(key: string): boolean;
    dump(): string;
    load(data: any): void;
}
