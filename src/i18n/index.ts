import { Event } from "../event";
import {
  I18nConfigProps,
  I18nLocaleProp,
  I18nMessagesProp,
} from "../types/i18n";
import { KapseliProp } from "../types/Kapseli";

export class I18n {
  event: Event;
  config: I18nConfigProps;
  constructor(config: I18nConfigProps, self: KapseliProp) {
    this.config = {
      locale: "en",
      messages: {},
      ...config,
    };
    this.event = self.Event;
  }
  getConfig() {
    return this.config;
  }
  setLocale(locale: I18nLocaleProp) {
    this.config.locale = locale;
    this.event.run("i18n:locale", {
      locale: locale,
      messages: this.config.messages[locale],
    });
  }
  getLocale() {
    return this.config.locale;
  }
  getMessages() {
    return this.config.messages;
  }
  setMessages(locale: I18nLocaleProp, messages: I18nMessagesProp) {
    this.config.messages[locale] = messages;
    this.event.run("i18n:add", {
      locale: locale,
      messages: this.config.messages[locale],
    });
  }
  addMessages(locale: I18nLocaleProp, messages: I18nMessagesProp) {
    if (locale in this.config.messages) {
      this.config.messages[locale] = {
        ...this.config.messages[locale],
        ...messages,
      };
    } else {
      this.config.messages[locale] = messages;
    }

    this.event.run("i18n:update", {
      locale: locale,
      messages: this.config.messages[locale],
    });
  }
  t(id: string) {
    let localized_message = this.config.messages[this.config.locale][id];
    return localized_message !== undefined ? localized_message : "?";
  }
}
