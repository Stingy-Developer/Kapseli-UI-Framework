import { VDom } from "..";
import { KapseliNodeProp } from "../../types/KapseliNode";

const removeScriptsFromHtml = (el: Element) => {
  let scripts = el.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    scripts[i].remove();
  }
  return el;
};

const removeScriptsFromVdom = (vdom: KapseliNodeProp) => {
  const BLACKLIST_TAGS = ["SCRIPT"];
  if (BLACKLIST_TAGS.includes(vdom.tag)) {
    vdom.tag = "COMMENT";
  }

  return vdom;
};

export function setKHTML(obj: VDom) {
  obj.addGenerator(
    "k-html",
    function (expression: string, vdom: KapseliNodeProp, self: any) {
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
    }
  );
}
