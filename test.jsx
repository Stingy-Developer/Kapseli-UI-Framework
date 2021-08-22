function createElement(tag,attr,...childs){
    if (tag === 'fragment') return childs
    return {tag,attr,childs}
}

let friends= ["a","b","c"]
let name ="x";
const app = (
    <>
    <p>Hello,</p>
    <p>world!</p>
  </>
)

console.log(app)