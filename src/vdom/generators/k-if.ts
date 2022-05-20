import { VDom } from "..";
import { KapseliNodeProp } from "../../types/KapseliNode";

export function setKIf(obj: VDom) {
  obj.addGenerator(
    "k-if",
    function (expression: string, vdom: KapseliNodeProp, self: any) {
      let value = false;
      let l = expression.split(" ");
      for (let i = 0; i < l.length; i++) {
        let data = self.getData(l[i]);
        l[i] = data !== undefined ? data : l[i];
      }

      let d = l.join(" ");
      if (d !== "") {
        try {
          value = value || eval(d);
        } catch (error) {
          value = value || false;
        }
      }

      if (!value) {
        vdom.prevTag = vdom.tag;
        vdom.tag = "COMMENT";
      } else {
        vdom.tag = vdom.prevTag ? vdom.prevTag : vdom.tag;
      }
    }
  );
}
