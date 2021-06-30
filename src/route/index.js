const { routeConfig } = require("./config");

class Route{
    constructor(config){
        this.config = config || {};
        this.routeConfig = config.route ? {...routeConfig,...config.route} : routeConfig;
    }
    addRoute(route,view){
        this.routeConfig.routes[route] = view;
    }
    __open(route){
        if( this.hasRoute(route) ){
            this.routeConfig.routes[route].render();
            history.pushState(null,
                this.routeConfig.routes[route].title,
                `${route}`
                );
        }
    }
    hasRoute(route){
        return route in this.routeConfig.routes ? true: false;
    }
    prev(){
        history.back();
        this.config.event.run("route:prev",location.pathname);
    }
    next(){
        history.forward();
        this.config.event.run("route:next",location.pathname);
    }
    getAll(){
        this.routeConfig.routes;
    }
    listen(){
        this.config.event.on("route:open",function(route){
            if(this.hasRoute(route)){
                this.__open(route);
            }else{
                window.stop();
                alert("This route is not found!");
            }
        });
    }
}

module.exports = {
    Route
}