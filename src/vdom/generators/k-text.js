function sanitizeHTML(text) {
  var element = document.createElement("div");
  element.innerText = text;
  return element.innerHTML;
}

export function setKText(obj) {
  obj.addGenerator("k-text", function (expression, vdom, self) {
    let data = self.getData(expression);

    if (data) {
      vdom.children = [sanitizeHTML(data).replaceAll("<br>", "")];
    } else {
      vdom.children = [];
    }
  });
}
