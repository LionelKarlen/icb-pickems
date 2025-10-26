import { Component, createMemo, createResource, createSignal, Setter } from "solid-js";
import { Tablepicker } from "../lib/components/Tablepicker";
import { blanked_groups, group_a, group_b } from "../lib/store/group";
import { hstack, stack } from "@style/patterns";
import { Btn } from "../lib/components/Btn";
import { Pickem } from "../lib/types/pickem";
import { identity } from "../lib/store/identity";
import { useNavigate } from "@solidjs/router";
import { pb } from "../lib/store/pocketbase";
import { ClientResponseError } from "pocketbase";

export const Pick: Component = () => {

  const [disabled, setDisabled] = createSignal(false);

  async function fetcher(): Promise<Pickem | null> {
    try {
      const res = await pb.collection("pickems").getFirstListItem<Pickem>(`user_name="${identity.name}" && user_group="${identity.group}"`);
      set_a_winner(res.a_winner);
      set_a_runner(res.a_runner);
      set_a_finals(res.a_finals);

      set_b_winner(res.b_winner);
      set_b_runner(res.b_runner);
      set_b_finals(res.b_finals);

      set_total_winner(res.total_winner);

      setDisabled(true);

    } catch (_e) {
      const e = _e as ClientResponseError
      // the fetcher responds with 404 whenever the given item does not exist
      // we can ignore this exception, since this will happen whenever someone enters a new pickem
      if (e.status != 404) {
        console.error(e);
      }
    }

    return null;
  }

  createResource(fetcher);

  const [a_winner, set_a_winner] = createSignal("");
  const [a_runner, set_a_runner] = createSignal("");
  const [a_finals, set_a_finals] = createSignal("");

  const [b_winner, set_b_winner] = createSignal("");
  const [b_runner, set_b_runner] = createSignal("");
  const [b_finals, set_b_finals] = createSignal("");

  const [total_winner, set_total_winner] = createSignal("");

  const valid = createMemo(() => a_winner() != "" && a_runner() != "" && a_finals() != "" && b_winner() != "" && b_runner() != "" && b_finals() != "" && total_winner() != "" && a_winner() != a_runner() && b_winner() != b_runner());

  const navigate = useNavigate();

  async function handleSubmit() {
    if (!valid()) return;

    const obj: Pickem = {
      user_name: identity.name,
      user_group: identity.group,
      a_winner: a_winner(),
      a_runner: a_runner(),
      a_finals: a_finals(),
      b_winner: b_winner(),
      b_runner: b_runner(),
      b_finals: b_finals(),
      total_winner: total_winner()
    }

    await pb.collection("pickems").create(obj)

    navigate("/thankyou");
  }

  function enforceExclude(value: string, other: string, setter: Setter<string>) {
    if (value != other) {
      setter(value)
    }
  }

  return (
    <>
      <div class={stack({ gap: 5 })}>
        <div class={hstack({ gap: 0 })}>
          <div class={stack({ gap: 0 })}>
            <div class={hstack({ gap: 0 })}>
              <Tablepicker options={group_a} labels={group_a} disabled value="" onChange={() => { }} />
              <Tablepicker options={group_a} label="Group Winner" disabled={disabled()} value={a_winner()} onChange={(v) => enforceExclude(v, a_runner(), set_a_winner)} />
              <Tablepicker options={group_a} label="Group Runner Up" disabled={disabled()} value={a_runner()} onChange={(v) => enforceExclude(v, a_winner(), set_a_runner)} />
              <Tablepicker options={group_a} label="Group Finals" disabled={disabled()} value={a_finals()} onChange={set_a_finals} />
            </div>
            <div class={hstack({ gap: 0 })}>
              <Tablepicker options={group_b} labels={group_b} disabled value="" onChange={() => { }} />
              <Tablepicker options={group_b} label="Group Winner" disabled={disabled()} value={b_winner()} onChange={(v) => enforceExclude(v, b_runner(), set_b_winner)} />
              <Tablepicker options={group_b} label="Group Runner Up" disabled={disabled()} value={b_runner()} onChange={(v) => enforceExclude(v, b_winner(), set_b_runner)} />
              <Tablepicker options={group_b} label="Group Finals" disabled={disabled()} value={b_finals()} onChange={set_b_finals} />
            </div>
          </div>

          <Tablepicker options={blanked_groups} label="Total Winner" disabled={disabled()} value={total_winner()} onChange={(v) => {
            if (v != "fake_spacer") set_total_winner(v)
          }} close_right />
        </div>
        <Btn onClick={handleSubmit} disabled={!valid() || disabled()}>Submit</Btn>
      </div>
    </>
  );
}
