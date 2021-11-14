import { FloatPanel, StaticPanel } from "../../components/Panel";
import { Provider } from "../../components/Provider";
export function setProvider(self) {
  self.View.addComponent("PROVIDER", new Provider());
  self.View.addComponent("left-pan", new FloatPanel("start", "left-pan"));
  self.View.addComponent("right-pan", new FloatPanel("end", "right-pan"));
  self.View.addComponent("bot-pan", new FloatPanel("bottom", "bot-pan"));
}
