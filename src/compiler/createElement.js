const BLACLIST = [
    "COMMENT"
]

const createElement = (node,klass) => {

   if(node){
       if( typeof node == "string"){
           return document.createTextNode(node);
           
       }else{
            if( !BLACLIST.includes(node.tag) ){
                // create element
                let el = document.createElement(node.tag);
 
                // add props
                for (const prop in node.props) {
                    if (Object.hasOwnProperty.call(node.props, prop)) {
                        if(!prop.startsWith("@")){
                            const propValue = node.props[prop];
                            el.setAttribute(prop,propValue);
                        }
                    }
                }

                // create Childs
                let childs = node.children;
                for (let i = 0; i < childs.length; i++) {
                    el.appendChild(
                        createElement(childs[i],klass)
                    )
                }
                
                // add Event Listeners
                let dirs = node.$directives;
                for (const key in dirs) {
                    if (Object.hasOwnProperty.call(dirs, key)) {
                        const dir = dirs[key];
                        if(!klass.getDirective( key )){
                            klass.addDirective(key,{render:function(el,cb){el.addEventListener(key.substr(1),cb)}})
                        }
                        const direc = klass.getDirective( key );
                        if(direc){
                            klass.throwKeyError(direc.render,'directive.render()');
                            direc.render(el, klass.getMethod( dir ) );
                        }
                        
                    }
                }

                return el;

              
            }else{
                return document.createComment("");
            } 
       }
   }else{
        return document.createTextNode("");
   }
}

export { createElement }