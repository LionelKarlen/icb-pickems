import { Component } from "solid-js";
import { Identity, identity } from "../lib/store/identity";

export const Thankyou: Component = () => {
  return (
    <>
      <h1>Thank you for participating, {(identity as Identity).name}</h1>
    </>
  );
}

