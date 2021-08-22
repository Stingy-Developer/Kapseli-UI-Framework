
const isArray = (arr) => {
    return Array.isArray(arr);
};


function renderObject(_object,rep,data,self){
    let obj = JSON.parse(JSON.stringify(_object));

    if(obj.tag == "DATA"){
        let vdata = obj.props["v-data"];
        vdata = vdata.split(".")[0];
        obj.props["v-data"] = vdata.includes(rep) ? obj.props["v-data"].replace(rep,data) : obj.props["v-data"];
    }else if(obj.props !== undefined){
        if( obj.props["v-if"] !== undefined){
            let vif = obj.props["v-if"];
            let vl = vif.split(" ");
            for (let i = 0; i < vl.length; i++) {
                let dotl = vl[i].split(".");
                obj.props["v-if"] = dotl[0].includes(rep) ? obj.props["v-if"].replace(rep,data) : obj.props["v-if"];
            }
        }
        
    }
    
    if(obj.props){
        var arr = Object.keys( obj.props );;
        for (let i = 0; i < arr.length; i++) {
            const prop = arr[i];
            if( self.getGenerator( prop ) ){
                if(prop == "v-for"){
                    let exps = obj.props[ prop ].split(" in ");
                    exps[1] = exps[1] == rep ? data : exps[1];
                    obj.props[ prop ] = exps.join(" in ");
                }else{
                    obj.props[ prop ] = obj.props[ prop ] == rep ? data : obj.props[ prop ];
                }
            }
            if(prop.startsWith(":")){
                let p_value = obj.props[prop];
                p_value = p_value.split(".")[0];
                obj.props[prop] = p_value.includes(rep) ? obj.props[prop].replace(rep,data) : obj.props[prop];
            }
        }
    }

    if(obj.children){
        for (let i = 0; i < obj.children.length; i++) {
            obj.children[i] = renderObject(obj.children[i],rep,data,self);
            
        }
    }
    return obj;
}

export function setVFor(obj){
    obj.addGenerator("v-for",function(expression,vdom,self){
        let exps = expression.split(" in ");
        if(exps.length < 2) throw `SyntaxError: Wrong expression for 'v-for' in '${vdom.tag}' element!`;
    
        let data = self.getData(exps[1]);
        if(data === "") throw `DataError: There is this data '${exps[1]}' in 'datas' for '${vdom.tag}' element!`;
    
        let childs = vdom.children;
        let rendered_childs = [];
        if(isArray(data)){
            for (let i = 0; i < data.length; i++) {
                self.notListenedData[`${exps[1]}_${exps[0]}_${i}`] = {
                    value:data[i],
                    index: i
                }
                if(childs.length > 0){
                    for (let k = 0; k < childs.length; k++) {
                        const child = childs[k];
                        rendered_childs.push(renderObject(child,exps[0],`${exps[1]}_${exps[0]}_${i}`,self));
                        
                    }
                }
            }
            
        }

        vdom.children = rendered_childs;

         
    });
}

/**
 * rendering v-for element
 */