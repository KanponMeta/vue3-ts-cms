import { createApp } from "vue";
import { createPinia } from "pinia";
import { kpRequest } from "@/service";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
kpRequest
  .request<DataType>({
    url: "/home/multidata",
    method: "GET",
  })
  .then((res) => {
    console.log(res.data);
    console.log(res.returnCode);
    console.log(res.success);
  });
