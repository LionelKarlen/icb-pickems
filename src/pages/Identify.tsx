import { Component, createMemo, createSignal } from "solid-js";
import { Selects } from "../lib/components/Select";
import { groups } from "../lib/store/group";
import { stack } from "@style/patterns";
import { Inputfield } from "../lib/components/Inputfield";
import { Btn } from "../lib/components/Btn";
import { setIdentity } from "../lib/store/identity";
import { A, useNavigate } from "@solidjs/router";
import { css } from "@style/css";

export const Identify: Component = () => {

  const [userGroup, setUserGroup] = createSignal("");
  const [userName, setUserName] = createSignal("");

  const valid = createMemo(() => userName() != "" && userGroup() != "");

  const navigate = useNavigate();

  function handleSubmit() {
    if (!valid()) return

    setIdentity({
      group: userGroup(),
      name: userName(),
      empty: false
    })


    navigate("/pick");
  }

  return (
    <>
      <div class={stack({ gap: "4", width: "50%" })}>
        <Selects label={"Group"} placeholder="Select your group" options={groups} onChange={(v) => setUserGroup(v)} value={userGroup()} />

        <Inputfield label="Name" value={userName()} onChange={(v) => setUserName(v)} />

        <Btn onClick={handleSubmit} disabled={!valid()}>Start Picking</Btn>

      </div>
      <A href={"/admin"} class={css({
        position: "absolute",
        bottom: "1em",
        right: "1em",
        color: "fg.disabled",
        cursor: "pointer"
      })}>I'm an admin</A>
    </>
  );
}
