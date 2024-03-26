import { writable } from "svelte/store";
import type { ToastArgs } from "./types";

export const toastStore = writable<ToastArgs>({
    active: false,
    status: "pending",
    message:""
})

export const mainContainerStore = writable({
    active: false
})