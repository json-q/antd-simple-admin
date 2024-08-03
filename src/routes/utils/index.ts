import { isArray } from "lodash-es";
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
 * 对 route 的 path 处理成统一格式
 */
export const mergeRoutePath = (routes: IRouteObject[], parentPath = "/"): IRouteObject[] => {
  return routes
    .map((item) => {
      if (item.redirect) return null;
      item = {
        ...item,
        path: mergePath(item.path, parentPath),
      };
      if (isArray(item.children) && item.children.length > 0) {
        item.children = mergeRoutePath(item.children, item.path);
      }
      return item;
    })
    .filter(Boolean) as IRouteObject[];
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

function isUrl(path: string) {
  if (!path.startsWith("http")) return false;

  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
}
