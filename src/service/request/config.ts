import { PRODUCTION, DEVELOPMENT } from "@/global";

let BASE_URL = "";
const TIME_OUT = 10000;

if (import.meta.env.MODE === DEVELOPMENT) {
  BASE_URL = "http://123.207.32.32:8000";
} else if (import.meta.env.MODE === PRODUCTION) {
  BASE_URL = "http://123.207.32.32:8000";
} else {
  BASE_URL = "";
}

export { BASE_URL, TIME_OUT };
