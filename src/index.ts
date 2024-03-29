/*!
 * Kapseli Framework v1.0.6 pre-production
 * Copyright 2021 Stingy Developer
 * Licensed under MIT
 */

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

export default {
  ...Kapseli,
};
