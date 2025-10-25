import { createStore } from "solid-js/store"

export type Identity = {
  name: string,
  group: string
}

export const [identity, setIdentity] = createStore<Identity>({ name: "", group: "" });
