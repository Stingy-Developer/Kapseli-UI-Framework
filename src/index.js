import { VDom } from "./vdom/index";
// import { Component } from "./components/Component";
import { Button } from "./components/Button";

// window.s = StorageManager;

// import {Kapseli} from "./app/app";

// window.Kapseli = Kapseli;
window.VDom = VDom;
window.Button = Button;


// let x = new VDom({
//     el:"#app",
//     data:{
//         hello:[["key","v"],["key1","v2"]],
//         show: true
//     },
//     methods:{
//         world(e){
//             x.data.hello.push(["test1","test2"]);
//             x.render();
//         },
//         p(){
//             console.log("waowww")
//         },
//         mymouseover(){
//             console.log("mouseover");
//         }
//     }
// });

// let b = new Button("","",function(e = "a"){
//     console.log("clicked",e);
// });

// x.addComponent("BTN",b);

// b = new Button("","",function(e){
//     console.log("clicked");
// });

// x.addComponent("BTN1",b);

// b = new Button("","",function(e){
//     console.log("clicked");
// });

// x.addComponent("BTN2",b);

// b = new Button("","",function(e){
//     console.log("clicked");
// });

// x.addComponent("BTN3",b);



// x.render();

// window.x = x;
