function createElement(tag, attr, ...childs) {
  if (tag === 'fragment') return childs;
  return {
    tag,
    attr,
    childs
  };
}

let friends = ["a", "b", "c"];
let name = "x";
const app = c('fragment', null, c("p", null, "Hello,"), c("p", null, "world!"));
console.log(app);