import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { unAuthRoutes, type IRouteObject } from "@/routes";
import { mergePath } from "@/routes/utils";
import { useSelector } from "@/stores";

type TFindCurrentRouteFn = (
  pathname: string,
  routes?: IRouteObject[] | undefined,
  parentPath?: string,
) => IRouteObject | undefined;

export const findCurrentRoute: TFindCurrentRouteFn = (
  pathname: string,
  routes = [],
  parentPath: string = "/",
) => {
  for (let i = 0; i < routes.length; i++) {
    const fullPath = mergePath(routes[i].path, parentPath);
    if (pathname.indexOf(fullPath) !== -1) {
      return routes[i];
    }
  }
};

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
    return math;
  }, [pathname, authRoutes]);

  useEffect(() => {
    // 手动传入的 path，可能不是路由切换，此时不同步更新 store
    if (!path) actionMatchRoute(mathRoute);
  }, [mathRoute]);

  return mathRoute;
}
