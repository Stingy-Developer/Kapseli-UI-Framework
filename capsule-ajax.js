Capsule.fn.ajax = {
    // Route names with callback
    routes : {},
    // urls with name
    urls : {},

    // ajax main func
    ajax : function(url,init){
        return new Promise(function(resolve,reject){
            fetch(url,init)
            .then(res => resolve(res))
            .catch(er => reject(er));
        });
    },

    // adding route
    addRoute : function (url,name,callback){
        if(typeof callback == "function" && name != "" && url != ""){
            this.routes[name] = callback;
            this.urls[name] = url;
        }else{
            console.error("callback is not a function or name is empty!");
        }
    },

    // checking route
    checkRoute : function(name) {
        return name in this.routes ? true : false;
    },

    // get
    get : function(url_or_name,func){
        if(this.checkRoute(url_or_name)){
            var url = this.urls[url_or_name];
            var callback = this.routes[url_or_name];

            this.ajax(url)
            .then(res => callback(res.json(),false))
            .catch(er => callback(false,er));
        }else{
            this.ajax(url_or_name)
            .then(res => func(res.json(),false))
            .catch(er => func(false,er));
        }
    }
} 





