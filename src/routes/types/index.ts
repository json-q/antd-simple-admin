import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export type AuthIndexRouteObject<T extends Record<string, any>> = Omit<
  IndexRouteObject,
  "index"
> & {
  [P in keyof T]: T[P];
};

export type AuthNonIndexRouteObject<T extends Record<string, any>> = Omit<
  NonIndexRouteObject,
  "children" | "index" | "path"
> & {
  [P in keyof T]: T[P];
} & {
  children?: AuthRouteObject<T>[];
};

export type AuthRouteObject<T extends Record<string, any>> =
  | AuthIndexRouteObject<T>
  | AuthNonIndexRouteObject<T>;

export interface IRouter {
  /** vite 自动导入路由为文件顺序，菜单渲染无序，order 指定排序 */
  order?: number;
  /**
   * @description 路由信息，嵌套子路由需写完整路由
   */
  path: string;
  /**
   * @description 是否为重定向地址，路由转菜单是不需要重定向项，过滤掉
   */
  redirect?: true;
  /**
   * @description 菜单名称/浏览器标题，若 `meta.title` 设置，则浏览器标题优先使用 `meta.title`
   */
  title?: string;
  /**
   * @description 是否展示 layout 布局（当前路由是否全屏显示）
   * @default true
   */
  layout?: false;
  /**
   * @description meta 路由的额外信息
   */
  icon?: React.ReactNode;
  meta?: {
    /**
     * @description 浏览器标题，若菜单没有配置 title，则使用该 title
     */
    title?: string;
    /**
     * @description 侧边栏（菜单）不显示该路由
     * @default false
     */
    hideMenu?: boolean;
    /**
     * @description 权限
     */
    access?: string | string[];
  };
}
