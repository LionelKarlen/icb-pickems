import { Component, createEffect } from "solid-js";
import { identity } from "../lib/store/identity";

export const Pick: Component = () => {
  createEffect(() => {
    console.log("identity", identity);
  })
  return (
    <>
    </>
  );
}
