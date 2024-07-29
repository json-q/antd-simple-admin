import { cloneDeep, isArray } from "lodash-es";
import { validateAccess } from "@/hooks/useAccess";
import type { IRouter } from "..";

// *** 此文件为 RenderRoutes 的静态函数逻辑抽离

/**
 * @param genRoutes 初始数组
 * @param routes 基础路由配置
 * @param role 用户权限
 * @returns 对应权限路由
 */
type GenAuthRoutesFn = (routes: IRouter[], role?: string[], genRoutes?: IRouter[]) => IRouter[];
export const genAuthRoutes: GenAuthRoutesFn = (routes, role = [], genRoutes = []) => {
  const _routes = cloneDeep(routes);

  _routes.forEach((item) => {
    const { meta, children } = item;
    const access = meta?.access;

    if (isArray(children) && children.length > 0) {
      genRoutes.push({
        ...item,
        children: genAuthRoutes(children, role),
      });
    } else if (access) {
      const hasAccess = validateAccess(role, access);
      hasAccess && genRoutes.push({ ...item }); // 存在权限配置，且校验通过，插入路由
    } else {
      genRoutes.push({ ...item });
    }
  });

  return genRoutes;
};

export function addRedirect(multMenu: IRouter[]): string | undefined {
  for (let i = 0; i < multMenu.length; i++) {
    const item = multMenu[i];

    if (item.children && isArray(item.children)) {
      // 递归找到第一个具有路由页面的节点就停止，作为父节点的重定向地址
      const _redirect = addRedirect(item.children);
      if (_redirect) return _redirect;
    }

    if (item.component) return item.path;
  }
}
