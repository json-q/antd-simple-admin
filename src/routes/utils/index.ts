import { cloneDeep, isArray } from "lodash-es";
import { validateAccess } from "@/hooks/useAccess";
import type { IRouter } from "..";

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
