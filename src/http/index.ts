import { message } from "@/hooks/useStaticApp";
import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import localCacha from "@/utils/cache/localCache";
import { TOKEN_CACHE, TOKEN_HEADER } from "@/constants";
import checkStatus from "./checkStatus";

enum HttpEnum {
  SUCCESS = 200,
  UN_AUTH = 401,
  UN_OPERATOR = 403,
  UNKNOWN = 500,
}

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config) => {
        const token = localCacha.get(TOKEN_CACHE);
        config.headers[TOKEN_HEADER] = token;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.service.interceptors.response.use(
      (response) => {
        const { data } = response;
        if (data.code == HttpEnum.UN_AUTH) {
          message.error(data.msg);
          return Promise.reject(data);
        }

        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== HttpEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }

        return data;
      },

      (error: AxiosError) => {
        const { response } = error;
        // 请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试");
        else if (response) checkStatus(response.status);
        return Promise.reject(error);
      },
    );
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _args = {}): Promise<R<T>> {
    return this.service.get(url, { params, ..._args });
  }
  post<T>(url: string, params?: object, _args = {}): Promise<R<T>> {
    return this.service.post(url, params, _args);
  }
  put<T>(url: string, params?: object, _args = {}): Promise<R<T>> {
    return this.service.put(url, params, _args);
  }
  delete<T>(url: string, params?: any, _args = {}): Promise<R<T>> {
    return this.service.delete(url, { params, ..._args });
  }
}
const http = new RequestHttp(config);

export default http;
