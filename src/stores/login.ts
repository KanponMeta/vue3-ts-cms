import { defineStore } from "pinia";

export const loginStore = defineStore({
  id: "login",
  state: () => ({
    hasLogin: false,
    hasLoginOut: false,
  }),
});
