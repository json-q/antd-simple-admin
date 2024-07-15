/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 网站标题 */
  readonly VITE_APP_TITLE: string;
  /**  axios 接口请求 baseURL */
  readonly VITE_API_BASE_URL: string;
  /** 后端接口地址 */
  readonly VITE_API_URL: string;
  /** 项目运行端口 */
  readonly VITE_PORT: number;
  /** 打包时是否移除 console */
  readonly VITE_DROP_CONSOLE: boolean;
  /** 打包时是否开启 gzip 压缩 */
  readonly VITE_BUILD_GZIP: boolean;
  /** 打包时的路由 baseName（适用于线上路由不是根路由 / 访问） */
  readonly VITE_BASE_ROUTER_NAME: string;
  /** 是否生成体积分析预览 stats.html */
  readonly VITE_REPORT: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
