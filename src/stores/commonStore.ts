import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "commonStore",
  state: () => ({
    background: "黑色",
    counter: 10,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
