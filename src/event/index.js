class Event{
    constructor(config){
        this.event = config || {};
    }
    register(name){
        if(!(name in this.event)){
            this.event[name] = [];
        }
    }
    run(name,args){
        if( name in this.event ){
            this.event[name].forEach(function(e){
                e(args);
            })
        }
    }
    on(name,cb){
        if( name in this.event ){
            this.event[name].push(cb);
        }
    }
    get(name){
        if( name in this.event ){
            return {
                name: name,
                listeners: this.event[name]
            };
        }
        return false;
    }
    getAll(){
        return this.event;
    }
    remove(name){
        if( name in this.event ){
            delete this.event[name];
        }
    }
}

module.exports = { Event }