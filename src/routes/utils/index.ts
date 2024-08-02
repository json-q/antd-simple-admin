import { cloneDeep, isArray } from "lodash-es";
import { validateAccess } from "@/hooks/useAccess";
import type { IRouteObject } from "..";

export type ModuleType = { default: IRouteObject[] };
export const loadModuleRouter = (modules: Record<string, ModuleType>) => {
  const moduleRouters: IRouteObject[] = [];
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || [];
    moduleRouters.push(...mod);
  });
  return moduleRouters;
};

/**
 * @param genRoutes 初始数组
 * @param routes 基础路由配置
 * @param role 用户权限
 * @returns 对应权限路由
 */
type GenAuthRoutesFn = (
  routes: IRouteObject[],
  role?: string[],
  genRoutes?: IRouteObject[],
) => IRouteObject[];
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

/**
 * 对 route 的 path 处理成统一格式
 */
export const mergeRoutePath = (routes: IRouteObject[], parentPath = "/") => {
  return routes.map((item) => {
    item = {
      ...item,
      path: mergePath(item.path, parentPath),
    };
    if (isArray(item.children) && item.children.length > 0) {
      item.children = mergeRoutePath(item.children, item.path);
    }
    return item;
  });
};

/**
 * 如果不是 / 开头的和父节点做一下合并
 * 如果是 / 开头的不作任何处理
 * 如果是 url 也直接返回
 */
export const mergePath = (path: string = "", parentPath: string = "/") => {
  if (path.endsWith("/*")) return path.replace("/*", "/");

  if ((path || parentPath).startsWith("/")) return path;

  if (isUrl(path)) return path;

  return `/${parentPath}/${path}`.replace(/\/\//g, "/").replace(/\/\//g, "/");
};

/**
 * 经处理后 authRoutes 的 path 可直接使用路由切割，规避递归
 */
export const genParentPaths = (currentPath?: string) => {
  if (!currentPath) return [];
  const paths = currentPath
    .split("/")
    .filter(Boolean)
    .map((path) => `/${path}`);

  // openKeys 不需要当前项
  paths.pop();

  let path = "";
  return paths.map((item) => (path += item));
};

function isUrl(path: string) {
  if (!path.startsWith("http")) return false;

  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
}
