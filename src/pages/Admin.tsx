import { Component, createResource, Index, Match, Show, Suspense, Switch } from "solid-js";
import { authStore, logout, pb } from "../lib/store/pocketbase";
import { Login } from "./Login";
import { Pickem } from "../lib/types/pickem";
import { hstack, stack } from "@style/patterns";
import "./admin.module.css"
import { css } from "@style/css";
import { CSVFile } from "../lib/types/csv";
import { useNavigate } from "@solidjs/router";

export const Admin: Component = () => {

  const [data] = createResource(fetcher)

  async function fetcher() {
    if ((authStore.auth ?? { id: null }).id == null) return;

    return await pb.collection("pickems").getFullList<Pickem>();
  }

  function getExportUrl() {
    if (!data()) return;

    let blob = CSVFile.fromPickems(data()!).toBlob()
    return URL.createObjectURL(blob);
  }

  const navigate = useNavigate();

  return (
    <>
      <Show when={(authStore.auth ?? { id: null }).id != null} fallback={<Login />}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Match when={data.error}>
              <span>Error: {data.error.message}</span>
            </Match>
            <Match when={data()}>
              <div class={hstack({ gap: 4, position: "absolute", top: "1em", right: "1em" })}>
                <a href={getExportUrl()} download={`icb pickems ${new Date(Date.now()).toLocaleString("de-ch")}.csv`}
                  class={css({
                    position: "absolute",
                    right: "1em",
                    top: "1em",
                    color: "fg.muted",
                    cursor: "pointer"
                  })}>Export</a>
              </div>
              <div class={stack({})}>
                <table>
                  <thead>
                    <tr>
                      <td>Group</td>
                      <td class={css({ borderRight: "1px solid" })}>Name</td>
                      <td>A Winner</td>
                      <td>A Runner-Up</td>
                      <td>A Finals</td>
                      <td>B Winner</td>
                      <td>B Runner-Up</td>
                      <td>B Finals</td>
                      <td>Winner</td>
                    </tr>
                  </thead>
                  <tbody>
                    <Index each={data()}>
                      {(item) => <tr>
                        <td>{item().user_group}</td>
                        <td class={css({ borderRight: "1px solid" })}>{item().user_name}</td>
                        <td>{item().a_winner}</td>
                        <td>{item().a_runner}</td>
                        <td>{item().a_finals}</td>
                        <td>{item().b_winner}</td>
                        <td>{item().b_runner}</td>
                        <td>{item().b_finals}</td>
                        <td>{item().total_winner}</td>
                      </tr>}
                    </Index>
                  </tbody>
                </table>
              </div>
            </Match>
          </Switch>
        </Suspense>
      </Show >

      <button onclick={logout} class={css({
        position: "absolute",
        bottom: "1em",
        right: "1em",
        color: "fg.muted",
        cursor: "pointer"
      })}>Logout</button>
    </>
  );
}
