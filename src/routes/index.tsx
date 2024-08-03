import { lazy, useEffect, useMemo } from "react";
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from "react-router-dom";
import { useSelector } from "@/stores";
import Loading from "@/components/Loading";
import AuthGuard from "./auth/AuthGuard";
import type { AuthRouteObject, IRouter } from "./types";
import { loadModuleRouter, mergeRoutePath, type ModuleType } from "./utils";
import { cloneDeep, isArray } from "lodash-es";
import { validateAccess } from "@/hooks/useAccess";

export type IRouteObject = AuthRouteObject<IRouter>;

/**
 * - 约定 layouts 目录下的路由文件需要认证，modules 目录下的一级文件不需要认证（同时没有 layout）
 * - layouts 目录下的路由默认会生成菜单，并嵌套在 layout 布局内，若无需布局全屏展示，配置 layout=false
 * - 若路由不想出现在菜单，同时全屏(无 layout)，需同时配置 layout=false 和 hideMenu=true
 */
const layoutModules = import.meta.glob<true, string, ModuleType>("./modules/layout/*.tsx", {
  eager: true,
});
const unLayoutModules = import.meta.glob<true, string, ModuleType>("./modules/*.tsx", {
  eager: true,
});

export const layoutRoutes = loadModuleRouter(layoutModules).sort((a, b) => a.order! - b.order!);
export const unAuthRoutes = loadModuleRouter(unLayoutModules).map((item) => {
  item.layout = false; // 自动给非 layout 的路由加上 layout=false
  return item;
});

const NotFound = lazy(() => import("@/pages/exception/404"));

export default function RenderRoutes() {
  const { currentUser, actionAuthRoutes } = useSelector(["currentUser", "actionAuthRoutes"]);

  const authRoutes = useMemo(() => {
    return genAuthRoutes(cloneDeep(layoutRoutes), currentUser?.role);
  }, [currentUser]);

  useEffect(() => {
    // 直接在 authRoutes（更新 state） 中更新 state 会出现问题，单独做 effect
    actionAuthRoutes(mergeRoutePath(authRoutes));
  }, [authRoutes]);

  return (
    <RouterProvider
      fallbackElement={<Loading />}
      router={createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/dashboard/analysis" replace />,
        },
        {
          path: "/",
          element: <AuthGuard />,
          children: authRoutes,
        },
        ...unAuthRoutes,
        {
          path: "*",
          element: <NotFound />,
        },
      ] as RouteObject[])}
    />
  );
}

type GenAuthRoutesFn = (
  routes: IRouteObject[],
  role?: string[],
  genRoutes?: IRouteObject[],
) => IRouteObject[];
/**
 * @param genRoutes 初始数组
 * @param routes 基础路由配置
 * @param role 用户权限
 * @returns 对应权限路由
 */
export const genAuthRoutes: GenAuthRoutesFn = (routes, role = [], genRoutes = []) => {
  routes.forEach((item) => {
    const { meta, children } = item;
    const access = meta?.access;

    if (isArray(children) && children.length > 0) {
      // !!! push 顺序一定要先添加重定向，再添加子路由，按照 react-router 路由匹配顺序
      genRoutes.push({
        path: item.path,
        element: <Navigate to={children[0].path} replace />,
        redirect: true,
      });

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
