import KPRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

export const kpRequest = new KPRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = "123456789";

      if (token) {
        // config.headers.UserAgent(`Bearer ${token}`);
      }

      return config;
    },
    requestInterceptorCatch: (error) => error,
    responseInterceptor: (config) => config,
    responseInterceptorCatch: (error) => error,
  },
});
