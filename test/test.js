import { className } from "../src/compiler/index";
  test('#className()', () => {
    expect(className(
        {
            "a": true
        }
    )).toBe("a");

    expect(className(
        {
            "a": true,
            "b": true,
            "c": false
        }
    )).toBe("a b");

    expect(className(
        {
            "a": false,
            "b": true,
            "c": true
        }
    )).toBe("b c");

    expect(className(
        {
            "a": true,
            "b": true
        }
    )).toBe("a b");
  });

