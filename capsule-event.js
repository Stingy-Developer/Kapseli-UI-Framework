Capsule.fn.on = function(event,callback){
    this.each(function (item) {
        item.addEventListener(event,callback);
    });
}

Capsule.fn.click = function(callback){
    this.on("click",callback);
}

Capsule.fn.dblclick = function(callback){
    this.on("dblclick",callback);
}

Capsule.fn.focus = function(callback){
    this.on("focus",callback);
}

Capsule.fn.blur = function(callback){
    this.on("blur",callback);
}

Capsule.fn.keyUp = function(callback){
    this.on("keyup",callback);
}

Capsule.fn.keyDown = function(callback){
    this.on("keyDown",callback);
}

Capsule.fn.keyPress = function(callback){
    this.on("keypress",callback);
}

Capsule.fn.ready = function(callback){
    this.on("DOMContentLoaded",callback);
}

Capsule.fn.load = function(callback){
    this.on("load",callback);
}

Capsule.fn.scroll = function(callback){
    this.on("scroll",callback);
}

Capsule.fn.resize = function(callback){
    this.on("resize",callback);
}

Capsule.fn.progress = function(callback){
    this.on("progress",callback);
}

Capsule.fn.change = function(callback){
    this.on("scroll",callback);
}

Capsule.fn.invalid = function(callback){
    this.on("invalid",callback);
}