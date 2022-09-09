import { Event } from "../event";
import { KapseliConfig, KapseliProp } from "../types/Kapseli";
import { StorageConfig, StorageManagerConfig } from "../types/Storage";
export declare class StorageManager {
    config: KapseliConfig;
    storageConfig: StorageManagerConfig;
    event: Event;
    constructor(conf: KapseliConfig, self: KapseliProp);
    getConfig(): StorageManagerConfig;
    add(label: string, conf: StorageConfig): void;
    get(label: string): StorageConfig;
    getStorages(): {
        [key: string]: StorageConfig;
    };
    getCurrent(): StorageConfig;
    setCurrent(label: string): void;
    store(data: any): Promise<void>;
    load(data: any): Promise<void>;
}
