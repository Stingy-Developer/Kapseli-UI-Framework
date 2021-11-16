const removeScriptsFromHtml = (el) => {
  let scripts = el.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    scripts[i].remove();
  }
  return el;
};

const removeScriptsFromVdom = (vdom) => {
  const BLACKLIST_TAGS = ["SCRIPT"];
  if (BLACKLIST_TAGS.includes(vdom.tag)) {
    vdom.tag = "COMMENT";
  }

  return vdom;
};

export function setKHTML(obj) {
  obj.addGenerator("k-html", function (expression, vdom, self) {
    let data = self.getData(expression);

    if (data) {
      if (typeof data === "string") {
        let el = document.createElement("div");
        el.innerHTML = data;
        vdom.children = [
          self._getVdom(removeScriptsFromHtml(el.firstElementChild)),
        ];
      } else if (typeof data === "object") {
        vdom.children = [removeScriptsFromVdom(data)];
      }
    } else {
      vdom.children = [];
    }
  });
}
