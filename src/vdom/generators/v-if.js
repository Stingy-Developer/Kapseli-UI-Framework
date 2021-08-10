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
        if(!value){
            vdom.props.style = "display:none!important;" + vdom.props.style; 
        }
    });
}
