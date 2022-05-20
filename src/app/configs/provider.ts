import { FloatPanel, StaticPanel } from "../../components/Panel";
import { Provider } from "../../components/Provider";
import { FormField } from "../../form/Field";
import { TextField } from "../../form/fields/TextField";
import { KapseliProp } from "../../types/Kapseli";

export function setProvider(self: KapseliProp) {
  self.View.addComponent("PROVIDER", Provider);
  self.View.addComponent("PANEL", FloatPanel);
  self.View.addComponent("FORM-FIELD", FormField);
  self.View.addComponent("TEXTINPUT", TextField);
}
