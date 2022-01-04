import { className } from "../src/compiler/index";
import kp from "../src/index";

test("#app_init", () => {
  expect(
    kp.init({
      view: { el: "#app" },
    })
  ).toBeDefined();
});

test("#event_run", () => {
  let app = kp.init({
    view: { el: "#app" },
  });

  expect(app.Event.run("app:init")).toBe(true);
  expect(app.Event.run("abc")).toBe(false);
});

test("#className()", () => {
  expect(
    className({
      a: true,
    })
  ).toBe("a");

  expect(
    className({
      a: true,
      b: true,
      c: false,
    })
  ).toBe("a b");

  expect(
    className({
      a: false,
      b: true,
      c: true,
    })
  ).toBe("b c");

  expect(
    className({
      a: true,
      b: true,
    })
  ).toBe("a b");
});
