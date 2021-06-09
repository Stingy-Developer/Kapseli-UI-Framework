function Capsule(e) {
    if (String(e).match("object")) {
        this.elems = [e];
    }
    else if ( typeof e == "string" ) {
        this.elems = Array.from(document.querySelectorAll(e));
    }
}

Capsule.fn = Capsule.prototype;

Capsule.fn.actions = {
    ACTIONS : {},
    addAction : function (key,callback){
        if(typeof callback == "function" && key != ""){
            this.ACTIONS[key] = callback;
        }else{
            console.error("callback is not a function or key is empty!");
        }
    },
    doAction : function (key){
        if(key != ""){
            return this.ACTIONS[key]();
        }else{
            console.error("key is empty!");
        }
    },
}

Capsule.fn.each = function(callback){
    for (let i = 0; i < this.elems.length; i++) {
        const e = this.elems[i];
        callback(e);
    }
}

Capsule.fn.slideDown = function (opts) {
    options = {
        duration : 500,
        ...opts
    }
    this.each(function (i) {
        i.style.display = ""
        var animation = i.animate([
            { height: "0px", overflow: "hidden" },
            { height: i.scrollHeight + "px", overflow: "hidden" }
        ], options);
        animation.finished.then(a => i.style.display = "");

        var el = new Capsule(i);
        el.addClass("capsule-slidedown");
        el.removeClass("capsule-slideup");
    });

};

Capsule.fn.slideUp = function (opts) {
    options = {
        duration : 500,
        ...opts
    }
    this.each(function (i) {
        var animation = i.animate([
            { height: i.scrollHeight + "px", overflow: "hidden" },
            { height: "0px", overflow: "hidden" }
        ], options);
        animation.finished.then(a => i.style.display = "none");

        var el = new Capsule(i);
        el.addClass("capsule-slideup");
        el.removeClass("capsule-slidedown");
    });
}

Capsule.fn.hasClass = function (classname) {
    var isClass = this.elems[0].classList.contains(classname);
    return isClass ? true : false;
}

Capsule.fn.slideToggle = function (opts) {
    this.each(function (i) {
        var el = new Capsule(i);
        if (!el.hasClass("capsule-slideup")) {
            el.slideUp(opts);
        } else {
            el.slideDown(opts);
        }
    });
}

Capsule.fn.toggleClass = function(classname){
    for (let x = 0; x < this.elems.length; x++) {
        const i = this.elems[x];
        item = new Capsule(i);
        if(item.hasClass(classname)){
            console.log("remove");
            item.removeClass(classname);
        }else{
            console.log("add");
            item.addClass(classname);
        }
    }
}

Capsule.fn.addClass = function(classname){
    this.each(function (i) {
        i.classList.add(classname);
    });
}

Capsule.fn.removeClass = function(classname){
    this.each(function (i) {
        i.classList.remove(classname);
    });
}

Capsule.fn.getAttr = function(attr){
    return this.elems[0].getAttribute(attr);
}

Capsule.fn.setAttr = function(attr,value){
    return this.elems[0].setAttribute(attr,value);
}

Capsule.fn.show = function(){
    this.each(function (item) {
        item.style.display = "";
    });
}

Capsule.fn.hide = function(){
    this.each(function (item) {
        item.style.display = "none";
    });
}

Capsule.fn.toggleDisplay = function(){
    this.each(function (item) {
        if(item.style.display == ""){
            item.style.display = "none";
        }else{
            item.style.display = "";
        }
    });
}

Capsule.fn.append = function(el){
    this.each(function(item){
        item.innerHTML += el.outerHTML;
    })
}   

Capsule.fn.input = function(){
    this.blur(function(e){
        if(e.target.value == ""){
            var ele = new Capsule(e.target);
            ele.addClass("invalid");
            ele.removeClass("valid");
        }else{
            var ele = new Capsule(e.target);
            ele.addClass("valid");
            ele.removeClass("invalid");
        }
    })
}

Capsule.fn.html = function(html){
    if(html){
        this.each(function(item){
            item.innerHTML = html; 
        })
    }else{
        return this.elems[0].innerHTML;
    }
}

Capsule.fn.value = function(value){
    if(value){
        this.each(function(item){
            item.value = value; 
        })
    }else{
        return this.elems[0].value;
    }
}