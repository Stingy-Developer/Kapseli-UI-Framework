window.jsx = (tag,props,...children) => {
    if(tag == 'fragment') return children;

    for (const prop in props) {
        if (Object.hasOwnProperty.call(props, prop)) {
            const prop_value = props[prop];

            if(prop.startsWith("on")){
                props[ prop.replace("on","@") ] = prop_value;
                delete props[prop];
            }
            
        }
    }
    return {
        tag: tag.toUpperCase(),
        props: props ? props : {},
        children
    }
}


import { Kapseli } from "./app/app";
import { Component } from "./components/Component";


window.Kapseli = Kapseli;
Kapseli.Component = Component;
