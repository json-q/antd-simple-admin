import { lazy, useEffect, useMemo } from "react";
import { createBrowserRouter, Navigate, RouterProvider, type RouteObject } from "react-router-dom";
import { useSelector } from "@/stores";
import Loading from "@/components/Loading";
import AuthGuard from "./auth/AuthGuard";
import type { AuthRouteObject, IRouter } from "./types";
import { genAuthRoutes, loadModuleRouter, mergeRoutePath, type ModuleType } from "./utils";

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
    const auth = genAuthRoutes(layoutRoutes, currentUser?.role);
    return auth;
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
