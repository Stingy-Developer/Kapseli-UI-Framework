export declare type I18nLocaleProp = string;
export declare type I18nMessagesProp = {
    [key: string]: string;
};
export interface I18nConfigProps {
    locale: I18nLocaleProp;
    messages: {
        [key: string]: I18nMessagesProp;
    };
}
