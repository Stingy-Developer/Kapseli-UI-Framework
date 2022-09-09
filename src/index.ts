import { Obj, JSX } from "./vdom/jsx";

import { Kapseli } from "./app/app";
declare global {
  interface Window {
    Kapseli: KapseliProp;
    jsx: (
      tag: string,
      props: Obj,
      ...children: Obj[]
    ) => { tag: string; props: Obj; children: Obj[] } | Obj[];
  }
}

window.jsx = JSX.createElement;

import { KapseliProp } from "./types/Kapseli";

export { Kapseli };
