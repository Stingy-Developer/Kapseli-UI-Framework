import { Obj, JSX } from "./vdom/jsx";

declare global {
  interface Window {
    jsx: (
      tag: string,
      props: Obj,
      ...children: Obj[]
    ) => { tag: string; props: Obj; children: Obj[] } | Obj[];
  }
}

window.jsx = JSX.createElement;

export { Kapseli } from "./app/app";
