import type { KapseliMethodObj } from "./View";
declare type VoidFunc = () => void;
export declare type KapseliFetchMethodProp = {
    "data-kapseli-fetch-mode": "on" | "off";
    "data-kapseli-fetch-method": "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    "data-kapseli-fetch-uri": string;
    "data-kapseli-fetch-opts": string;
} | false;
export interface KapseliComponentConfigProp {
    props?: string[];
    methods?: KapseliMethodObj;
    data?: any;
    template: any;
    fetchMethod?: {
        fetchMode: "on" | "off";
        fetch: {
            uri: string;
            method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
            opts: {
                [key: string]: any;
            };
        };
    } | false;
    mounted?: VoidFunc;
    updated?: VoidFunc;
    inheritances?: {
        new (): Object;
    }[];
    useMemo?: string | false;
}
export {};
