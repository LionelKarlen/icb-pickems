import { stack } from "@style/patterns";
import { Component, createMemo, createSignal, Show } from "solid-js";
import { Inputfield } from "../lib/components/Inputfield";
import { Btn } from "../lib/components/Btn";
import { pb, setAuthStore } from "../lib/store/pocketbase";
import { ClientResponseError } from "pocketbase";

export const Login: Component = () => {

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const [error, setError] = createSignal("");

  const valid = createMemo(() => username() != "" && password() != "");

  async function handleSubmit() {
    try {
      let res = await pb.collection("users").authWithPassword(`${username()}@icb.susco.ch`, password())
      setAuthStore({ auth: res.record });
    } catch (_e) {
      let e = _e as ClientResponseError
      setError(e.message);
    }
  }

  return (
    <div class={stack({ gap: "4", width: "50%" })}>

      <Inputfield label="Username" value={username()} onChange={(v) => setUsername(v)} />
      <Inputfield label="Password" value={password()} onChange={(v) => setPassword(v)} type="password" />

      <Btn onClick={handleSubmit} disabled={!valid()}>Login</Btn>

      <Show when={error() != ""}>
        <p>{error()}</p>
      </Show>

    </div>
  );
}
