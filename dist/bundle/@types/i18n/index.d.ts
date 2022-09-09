import { Event } from "../event";
import { I18nConfigProps, I18nLocaleProp, I18nMessagesProp } from "../types/i18n";
import { KapseliProp } from "../types/Kapseli";
export declare class I18n {
    event: Event;
    config: I18nConfigProps;
    constructor(config: I18nConfigProps, self: KapseliProp);
    getConfig(): I18nConfigProps;
    setLocale(locale: I18nLocaleProp): void;
    getLocale(): string;
    getMessages(): {
        [key: string]: I18nMessagesProp;
    };
    setMessages(locale: I18nLocaleProp, messages: I18nMessagesProp): void;
    addMessages(locale: I18nLocaleProp, messages: I18nMessagesProp): void;
    t(id: string): string;
}
