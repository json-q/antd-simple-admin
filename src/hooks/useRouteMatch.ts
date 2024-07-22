import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { has, isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";

type TFindCurentRouteFn = (
  pathname: string,
  routes?: IRouter[] | undefined,
  treeMatchRoute?: IRouter[],
) => TMatchRoute | undefined;
type TMatchRoute = { matchRoute: IRouter | undefined; treeMatchRoute: IRouter[] };

export const findCurentRoute: TFindCurentRouteFn = (
  pathname: string,
  routes = [],
  treeMatchRoute = [],
) => {
  for (let i = 0; i < routes.length; i++) {
    if (has(routes[i], "index")) continue; // redirect 不做匹配

    if (pathname === routes[i].path) {
      treeMatchRoute.push(routes[i]);
      return { matchRoute: routes[i], treeMatchRoute };
    }

    const exist = pathname.indexOf(routes[i].path);
    if (exist === -1) continue;

    if (routes[i].children && isArray(routes[i].children)) {
      treeMatchRoute.push(routes[i]);
      return findCurentRoute(pathname, routes[i].children, treeMatchRoute);
    }
    continue;
  }
};

/**
 * @description 路由变化时匹配当前路由在路由表的配置信息，及对应的路由树
 * @returns `{ matchRoute, treeMatchRoute }`
 */
export default function useRouteMatch(path?: string): TMatchRoute {
  const location = useLocation();
  const pathname = path || location.pathname;
  const [matchRoute, setMatchRoute] = useState<TMatchRoute>({
    matchRoute: undefined,
    treeMatchRoute: [],
  });

  useEffect(() => {
    const match = findCurentRoute(pathname, routes);
    if (match) setMatchRoute({ ...match });
  }, [pathname]);

  return matchRoute;
}
