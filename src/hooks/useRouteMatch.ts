import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { isArray } from "lodash-es";
import { unAuthRoutes, type IRouteObject } from "@/routes";
import { mergePath } from "@/routes/utils";
import { useSelector } from "@/stores";

type TFindCurrentRouteFn = (
  pathname: string,
  routes?: IRouteObject[],
  treeRoute?: IRouteObject[],
  parentPath?: string,
) => TMatchRoute | undefined;

export type TMatchRoute = { route: IRouteObject | undefined; treeRoute: IRouteObject[] };
export const findCurrentRoute: TFindCurrentRouteFn = (
  pathname: string,
  routes = [],
  treeRoute = [],
  parentPath: string = "/",
) => {
  for (let i = 0; i < routes.length; i++) {
    const fullPath = mergePath(routes[i].path, parentPath);
    if (pathname === fullPath) {
      treeRoute.push(routes[i]);
      return { route: routes[i], treeRoute };
    }

    const exist = pathname.indexOf(routes[i].path);
    if (exist === -1) continue;

    if (routes[i].children && isArray(routes[i].children)) {
      treeRoute.push(routes[i]);
      return findCurrentRoute(pathname, routes[i].children, treeRoute, fullPath);
    }
    continue;
  }
};

export const defaultMathRoute: TMatchRoute = { route: undefined, treeRoute: [] };
/**
 * @description 路由变化时匹配当前路由在路由表的配置信息，及对应的路由树
 * @returns `{ route, treeRoute }`
 */
export default function useRouteMatch(path?: string) {
  const location = useLocation();
  const { authRoutes, actionMatchRoute } = useSelector(["authRoutes", "actionMatchRoute"]);
  const pathname = path || location.pathname;

  const mathRoute = useMemo(() => {
    const math = findCurrentRoute(pathname, [...authRoutes, ...unAuthRoutes]);

    return math || defaultMathRoute;
  }, [pathname, authRoutes]);

  useEffect(() => {
    // 手动传入的 path，可能不是路由切换，此时不同步更新 store
    if (!path) actionMatchRoute(mathRoute);
  }, [mathRoute]);

  return mathRoute;
}
