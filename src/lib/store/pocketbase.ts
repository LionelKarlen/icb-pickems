import Pocketbase from "pocketbase"
import { createStore } from "solid-js/store"

export const pb = new Pocketbase("http://localhost:8090/")

export const [authStore, setAuthStore] = createStore({ auth: pb.authStore.record });

export function logout() {
  pb.authStore.clear();
  setAuthStore({ auth: null });
}
