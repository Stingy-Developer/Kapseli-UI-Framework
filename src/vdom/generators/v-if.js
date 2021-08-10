export function setVIf(obj){
    obj.addGenerator("v-if",function(expression,vdom,self){
        let d = self.getData(expression);
        if(d !== "") expression = d;
        let value = false;
        try {
            value = eval(expression);
        } catch (error) {
            value = expression;
        }
        console.log(value)
        if(!value){
            vdom.prevTag = vdom.tag;
            vdom.tag = "COMMENT";
        }else{
            vdom.tag = vdom.prevTag ? vdom.prevTag : vdom.tag;
        }
    });
}
