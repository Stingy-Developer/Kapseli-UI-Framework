import { KapseliProp } from "../../types/Kapseli";

export function setCommands(self: KapseliProp) {
  // self.Command.add("storage:load", {
  //   run: (arg) => {
  //     (async (arg: any) => {
  //       await self.Storage.load();
  //     })(arg);
  //   },
  // });

  // self.Command.add("storage:store", async function (cb) {
  //   await self.Storage.store();
  //   cb();
  // });

  let static_panels = ["left-side", "right-side", "nav", "status"];
  let float_panels = ["left-pan", "right-pan", "bot-pan"];

  // static_panels.forEach((p) => {
  //   self.Command.add(`panel:${p}:show`, {
  //     run: function () {
  //       self.Panel.show(p);
  //     },
  //   });

  //   self.Command.add(`panel:${p}:hide`, {
  //     run: function () {
  //       self.Panel.hide(p);
  //     },
  //   });
  // });

  float_panels.forEach((p) => {
    self.Command.add(`panel:${p}:open`, {
      run: function () {
        self.View._component_memo[p].$options.show();
      },
    });

    self.Command.add(`panel:${p}:close`, {
      run: function () {
        self.View._component_memo[p].$options.hide();
      },
    });

    self.Command.add(`panel:${p}:toggle`, {
      run: function () {
        self.View._component_memo[p].$options.toggle();
      },
    });
  });

  self.Command.add(`route:prev`, {
    run: function () {
      self.Route.prev();
    },
  });

  self.Command.add(`route:next`, {
    run: function () {
      self.Route.next();
    },
  });
}
