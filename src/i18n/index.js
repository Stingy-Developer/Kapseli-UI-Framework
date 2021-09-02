export class I18n{
    constructor(config,self){
        this.config = {
            "locale": "en",
            "messages": {},
            ...config
        };
        this.event = self.Event;
    }
    getConfig(){
        return this.config;
    }
    setLocale(locale){
        this.config["locale"] = locale;
        this.event.run("i18n:locale",{
            locale: locale,
            messages: this.config["messages"][locale]
        });
    }
    getLocale(){
        return this.config["locale"];
    }
    getMessages(){
        return this.config["messages"];
    }
    setMessages(locale,messages){
        this.config["messages"][locale] = messages;
        this.event.run("i18n:add",{
            locale: locale,
            messages: this.config["messages"][locale]
        }); 
    }
    addMessages(locale,messages){
        if( locale in this.config["messages"] ){
            this.config["messages"][locale] = {
                ...this.config["messages"][locale],
                ...messages
            };
        }else{
            this.config["messages"][locale] = messages;
        }

        this.event.run("i18n:update",{
            locale: locale,
            messages: this.config["messages"][locale]
        });   
    }
    t(id){
        let localized_message = this.config["messages"][ this.config["locale"] ][id]; 
        return localized_message !== undefined ? localized_message : "?"
    }
}

