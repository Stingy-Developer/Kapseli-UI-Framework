export function setKModel(obj) {
  obj.addGenerator("k-model", function (expression, vdom, self) {
    let data = self.getData(expression);

    switch (vdom.props["type"]) {
      case "checkbox":
        vdom.props["@input"] = "k_model_input_checked";
        vdom.props["checked"] = data;
        break;

      case "file":
      case "image":
        vdom.props["@input"] = "k_model_input_files";
        break;

      default:
        vdom.props["@input"] = "k_model_input_value";
        if (vdom.tag === "TEXTAREA") {
          vdom.children = [String(data)];
        } else {
          vdom.props["value"] = data;
        }

        break;
    }

    vdom.component_uuid = "__GLOBAL__";

    self.methods[vdom.component_uuid] = {
      k_model_input_value(e) {
        self.data[expression] = e.target.value;
      },
      k_model_input_checked(e) {
        self.data[expression] = e.target.checked;
      },
      k_model_input_files(e) {
        self.data[expression] = e.target.files;
      },
    };
  });
}
