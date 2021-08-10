import { m,createElement,patch,className,style } from "../compiler/index";
import { setVFor } from "../vdom/generators/v-for";
import { setVIf } from "../vdom/generators/v-if";

/**
 * TODO:         attrs["data-object-id"] = attrs["data-object-id"] ? attrs["data-object-id"] : Math.random().toString(36).substr(2,7);
 * To improve performance put object token. 
 */

class VDom{
    constructor(conf){

        let config = conf ? conf : false;
        this.$directives = {};
        this.$generators = {};
        this.el = config.el ? this.getEl(config.el) : false;
        this.methods = config.methods ? config.methods : {};
        this.notListenedData = {};
        this.$components = {};
        
        if(config.data){
          
            this.data = new Proxy(config.data,{
                set: (target, key, value)=>{
                target[key] = value;
                this.render();
                return true;
                }
            });
        }

        setVFor(this);
        setVIf(this);
    }

    throwKeyError(key,key_str){
        if(!key) throw `'${key_str}' property is not defined!`;
    }

    getEl(selector){
        let el = document.querySelector(selector);
    
        if(el){
            return el;
        }else{
            return false;
        }
    }

    __attr_class(classname){
        let classes = {};
        var d = classname.split(" ");
        for (let i = 0; i < d.length; i++) {
            classes[ d[i] ] = true;
        }
        return classes;
    }

    __attr_style(style){
        let styles = {};
        var d = style.split(";");
        for (let i = 0; i < d.length; i++) {
            styles[ d[i].split(":")[0] ] = d[i].split(":")[1];
        }
        return styles;
    }

    _beautyAttr(attr){
        var attrs = {};
        for (let i = 0; i < attr.length; i++) {
            const at = attr[i];

            if(at.name == "classlist"){
                attrs["className"] = className( this.__attr_class(at.value) )
            }else if(at.name == "style"){
                attrs["style"] = style( this.__attr_style(at.value) )
            }else{
                attrs[at.name] = at.value;
            }
        }

        return attrs;
    }

    h (tag, props, children) {
        return { tag, props, children }
    }

    _getVdom(el){
        let childs = []; 
        
        if(el && el.nodeName != "#text"){
            for (let i = 0; i < el.childNodes.length; i++) {
    
                var element = this._getVdom(el.childNodes[i]);
                childs.push(element);       
            }
            return this.h( el.tagName, this._beautyAttr(el.attributes), childs ); 
        }else{
            return el.data;
        }
      
    }

    addDirective(id,obj){
        this.$directives[id] = obj;
    }

    getDirective(id){
        return this.$directives[id] ? this.$directives[id] : false;
    }

    addComponent(tag,component){
        this.$components[tag] = component;
    }

    getComponent(tag){
        return this.$components[tag];
    }

    renderComponent(tag,props){
        let component = this.getComponent(tag);
        component.init(props);
        return component.render(this);
    }

    getData(key_str){
        let data = this.data;
        let array = key_str.split(".");

        for (let i = 0; i < array.length; i++) {
            try {
                data = data[ array[i] ];

                if(data === undefined){
                    let nlistdata = this.notListenedData;
                    let nlistarray = key_str.split(".");

                    for (let i = 0; i < nlistarray.length; i++) {
                        try {
                            nlistdata = nlistdata[ nlistarray[i] ];

                        } catch (error) {
                            return "";   
                        }
                    }
                    return nlistdata;
                }

            } catch (error) {
                return "";   
            }
        }

        return data;
    }

    getMethod(key_str){
        if(this.methods){
            return this.methods[key_str];
        }else{
            throw `'${key_str}' property is not defined in 'methods'!`;
        }
    }

    addGenerator(key,cb){
        this.$generators[key] = cb; //cb(expression,vdom,this)
    }

    getGenerator(key){
        return this.$generators[key] ? this.$generators[key] : false;
    }

    renderGenerators(_vdom){
        let vdom = JSON.parse(JSON.stringify(_vdom));
        this.throwKeyError(_vdom,'vdom');
        if(vdom && typeof vdom !== "string"){
            let props = Object.keys(vdom.props);

            for (let i = 0; i < props.length; i++) {
                const prop = props[i];
                const generator = this.getGenerator( prop );
                if(generator){
                    generator(vdom.props[prop],vdom,this );
                }
            }

        
            for (let i = 0; i < vdom.children.length; i++) {
                vdom.children[i] = this.renderGenerators(vdom.children[i])    
            }   
        }

        return vdom;    
    }

    renderVDom(){
        let renderedvdom = false;
        if(!this.app){
            this.$vdom = this._getVdom(this.el);
            renderedvdom = this.renderGenerators(this.$vdom);

            this.$current_vdom = this.renderObject(renderedvdom);
            this.app = createElement( 
               this.$current_vdom,this 
                );
            this.el.parentElement.replaceChild(this.app,this.el);
        }else{
            renderedvdom = this.renderGenerators(this.$vdom);
            let vdom = this.renderObject(renderedvdom);
            patch(this.app,vdom,this.$current_vdom,this);
            this.$current_vdom = vdom;
        }

    }

    renderObject(_object){
        let obj = JSON.parse(JSON.stringify(_object));
        if(obj.tag in this.$components){
            let comp = this.renderComponent(obj.tag,obj.props);
            obj = comp.vdom;
            this.methods = {
                ...this.methods,
                ...comp.methods
            };
        }
        
        if(obj.props){
            var arr = Object.keys( obj.props );
            obj["$directives"] = {};
            for (let i = 0; i < arr.length; i++) {
                const prop = arr[i];
                if(prop.startsWith("@")){
                    obj["$directives"][prop] = obj.props[prop];
                }
            }
        
        }
        
        if(obj.tag == "DATA"){
            let value = this.getData( obj.props["v-data"] );
            if(value !== ""){
                obj = String(value);
            }
        }else if( typeof obj === "string" ){
            obj = obj;
        }else{
            for (let i = 0; i < obj.children.length; i++) {
                obj.children[i] = this.renderObject( obj.children[i] ); 
            }
        }
        
        return obj;
    }

    render(){
        this.renderVDom();
        console.log(this.$vdom.props["data-object-id"])
    }
}

VDom.component = VDom.prototype.addComponent;

export { VDom }