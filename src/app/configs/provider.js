import { FloatPanel, StaticPanel } from "../../components/Panel";
import { Provider } from "../../components/Provider";
export function setProvider(self) {
  self.View.addComponent("PROVIDER", Provider);
  self.View.addComponent("PANEL", FloatPanel);
}
