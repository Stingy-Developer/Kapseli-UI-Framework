class Command{
    constructor(config){
        this.commands = {};
        this.states = {};
        this.event = config.event;

    }
    add(command,cb){
        if( !this.has(command) ){
            this.commands[command] = cb;
            this.states[command] = false;
        }
    }
    has(command){
        return command in this.commands ? true : false;
    }
    get(command){
        if( this.has(command) ){
            return this.commands[command];
        }
        return false;
    }
    getAll(){
        return this.commands;
    }
    run(command,args){
        if( this.has(command) ){
            this.states[command] = true;
            this.event.run(`run`,args);
            this.event.run(`run:${command}:before`,args);
            this.commands[command].run(args);
            this.event.run(`run:${command}:after`,args);
            
            if( !("stop" in this.commands[command]) ){
                this.states[command] = false;
            }
        }
        return false;
    }
    stop(command,args){
        if( this.has(command) ){
            if("stop" in this.commands[command]){
                this.event.run(`stop`,args);
                this.event.run(`stop:${command}:before`,args);
                this.commands[command].stop(args);
                this.event.run(`stop:${command}:after`,args);
                this.states[command] = false;
            }
        }
        return false;
    }
    isActive(command){
        if( this.has(command) ){
            return this.states[command];
        }
        return false;
    }
    getActives(){
        let actives = [];
        for (const command in this.states) {
            if (Object.hasOwnProperty.call(this.states, command)) {
                const state = this.states[command];
                if(state){
                    actives.push( this.commands[command] );
                }
            }
        }
        return actives;
    }
}

export { Command }