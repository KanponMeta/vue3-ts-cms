import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface KPRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

interface KPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: KPRequestInterceptors<T>;
}

class KPRequest {
  instance: AxiosInstance;

  constructor(config: KPRequestConfig) {
    this.instance = axios.create(config);

    // 初始化时，各个请求实例所设置的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    );

    // 所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有的实例都有的发送成功拦截器");
        return config;
      },
      (error) => {
        console.log("所有的实例都有的发送失败拦截器");
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有的实例都有的响应成功拦截器");
        return res.data;
      },
      (error) => {
        console.log("所有的实例都有的响应失败拦截器");

        if (error.response.status === 404) {
          console.log("404错误");
        }
        return error;
      }
    );
  }

  request<T = any>(config: KPRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 将结果resolve返回出去
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          return error;
        });
    });
  }

  get<T = any>(config: KPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: KPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: KPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: KPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default KPRequest;
