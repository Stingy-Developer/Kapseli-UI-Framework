class AJAXForm{
    constructor(config){
        this.forms = config.forms ? config.forms : {};
        this.config = config;
    }

    get(id){
        return this.forms[id];
    }

    submit(id){
        
    }

}