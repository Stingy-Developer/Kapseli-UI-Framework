const { Storage } = require("./src/storage/index");

try {
    let x = new Storage()
    console.log(x.getCurrent() )

    x.getStorages()
    x.setCurrent("remote")
    console.log(x.getCurrent() )

} catch (error) {
    console.log(error);
}
