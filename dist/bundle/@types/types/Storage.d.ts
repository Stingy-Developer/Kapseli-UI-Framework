export interface StorageConfig {
    load: (data: any) => Promise<any>;
    store: (data: any) => Promise<any>;
    options: {
        [key: string]: any;
    };
}
export interface StorageManagerConfig {
    storages: {
        [key: string]: StorageConfig;
    };
    currentStorage: string;
}
