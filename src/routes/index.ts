import { lazy } from "react";

import dashboard from "./modules/dashboard";
import form from "./modules/form";
import list from "./modules/list";
import profile from "./modules/profile";
import result from "./modules/result";
import exception from "./modules/exception";
import account from "./modules/account";
import nested from "./modules/nested";

const routes: IRouter[] = [
  {
    path: "/",
    redirect: "/dashboard/analysis",
    index: true,
  },
  ...dashboard,
  ...form,
  ...list,
  ...profile,
  ...result,
  ...exception,
  ...account,
  ...nested,
  {
    path: "*",
    component: lazy(() => import(/* webpackChunkName: "404" */ "@/pages/exception/404")),
    layout: false,
  },
];

export default routes;

export interface IRouter {
  /**
   * @description 路由信息，嵌套子路由需写完整路由
   */
  path: string;
  /**
   * @description 重定向地址，嵌套菜单情况下，若不手指定，则默认寻找第一个具有页面(component)的子路由作为重定向地址
   */
  redirect?: string;
  /**
   * @description 是否是根路由
   */
  index?: true;
  component?: React.FC;
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
  icon?: React.FC;
  meta?: {
    /**
     * @description 浏览器标题，若菜单没有配置 title，则使用该 title
     */
    title?: string;
    /**
     * @description 侧边栏隐藏该路由
     * @default false
     */
    hidden?: boolean;
  };
  children?: IRouter[];
}
