const isArray = (arr) => {
  return Array.isArray(arr);
};

function renderObject(_object, rep, data, self) {
  let obj = JSON.parse(JSON.stringify(_object));

  if (obj.tag == "DATA") {
    let vdata = obj.props["k-data"];
    vdata = vdata.split(".")[0];
    obj.props["k-data"] = vdata.includes(rep)
      ? obj.props["k-data"].replace(rep, data)
      : obj.props["k-data"];
  } else if (obj.props !== undefined) {
    if (obj.props["k-if"] !== undefined) {
      let vif = obj.props["k-if"];
      let vl = vif.split(" ");
      for (let i = 0; i < vl.length; i++) {
        let dotl = vl[i].split(".");
        obj.props["k-if"] = dotl[0].includes(rep)
          ? obj.props["k-if"].replace(rep, data)
          : obj.props["k-if"];
      }
    }
  }

  if (obj.props) {
    var arr = Object.keys(obj.props);
    for (let i = 0; i < arr.length; i++) {
      const prop = arr[i];
      if (self.getGenerator(prop)) {
        if (prop == "k-for") {
          let exps = obj.props[prop].split(" in ");

          exps[1] = exps[1].includes(rep)
            ? exps[1].replace(rep, data)
            : exps[1];
          obj.props[prop] = exps.join(" in ");
        } else {
          obj.props[prop] = obj.props[prop] == rep ? data : obj.props[prop];
        }
      }
      if (prop.startsWith("bind-")) {
        let p_value = obj.props[prop];
        p_value = p_value.split(".")[0];
        obj.props[prop] = p_value.includes(rep)
          ? obj.props[prop].replace(rep, data)
          : obj.props[prop];
      }
    }
  }

  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      obj.children[i] = renderObject(obj.children[i], rep, data, self);
    }
  }
  return obj;
}

export function setKFor(obj) {
  obj.addGenerator("k-for", function (expression, vdom, self) {
    let exps = expression.split(" in ");
    if (exps.length < 2)
      throw `SyntaxError: Wrong expression for 'k-for' in '${vdom.tag}' element!`;

    let data = self.getData(exps[1]);
    if (data === "")
      throw `DataError: There is this data '${exps[1]}' in 'datas' for '${vdom.tag}' element!`;

    let childs = vdom.children;
    let rendered_childs = [];
    if (isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        self.notListenedData[`${exps[1].replace(".", "_")}_${exps[0]}_${i}`] =
          data[i];
        if (childs.length > 0) {
          for (let k = 0; k < childs.length; k++) {
            const child = childs[k];
            rendered_childs.push(
              renderObject(
                child,
                exps[0],
                `${exps[1].replace(".", "_")}_${exps[0]}_${i}`,
                self
              )
            );
          }
        }
      }
    }

    vdom.children = rendered_childs;
  });
}

/**
 * rendering k-for element
 */
