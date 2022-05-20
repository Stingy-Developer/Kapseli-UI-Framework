import { VDom } from "..";
import { KapseliNodeProp } from "../../types/KapseliNode";

function sanitizeHTML(text: string) {
  var element = document.createElement("div");
  element.innerText = text;
  return element.innerHTML;
}

export function setKText(obj: VDom) {
  obj.addGenerator(
    "k-text",
    function (expression: string, vdom: KapseliNodeProp, self: any) {
      let data: string = self.getData(expression);

      if (data) {
        vdom.children = [sanitizeHTML(data).replace("<br>", "")];
      } else {
        vdom.children = [];
      }
    }
  );
}
