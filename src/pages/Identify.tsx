import { Component, createSignal } from "solid-js";
import { Selects } from "../lib/components/Select";
import { groups } from "../lib/store/group";
import { stack } from "@style/patterns";
import { Inputfield } from "../lib/components/Inputfield";

export const Identify: Component = () => {

  const [userGroup, setUserGroup] = createSignal("");
  const [userName, setUserName] = createSignal("");

  return (
    <>
      <div class={stack({ gap: "4", width: "50%" })}>
        <Selects label={"Group"} placeholder="Select your group" options={groups} onChange={(v) => setUserGroup(v)} value={userGroup()} />

        <Inputfield label="Name" value={userName()} onChange={(v) => setUserName(v)} />

      </div>
    </>
  );
}
