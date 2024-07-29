import { createElement, memo, useMemo } from "react";
import { Navigate, Route, RouteObject, Routes } from "react-router-dom";
import { useDeepCompareEffect } from "ahooks";
import routes, { type IRouter } from "@/routes";
import PageLayout from "@/layouts";
import { useSelector } from "@/stores";
import { validateAccess } from "@/hooks/useAccess";
import { addRedirect, genAuthRoutes } from "./utils";
import { isArray } from "lodash-es";

const RednerRoutes: React.FC = memo(() => {
  const { currentUser, authRoutes, actionAuthRoutes } = useSelector([
    "currentUser",
    "authRoutes",
    "actionAuthRoutes",
  ]);

  useDeepCompareEffect(() => {
    actionAuthRoutes(genAuthRoutes(routes, currentUser?.role));
  }, [routes, currentUser]);

  const test = useMemo(() => {
    function genBaseRcRoutes(routes: IRouter[]) {
      const reactRoutes: RouteObject[] = [];
      for (let i = 0; i < routes.length; i++) {
        const item = routes[i];
        const hasChildren = isArray(item.children) && item.children.length > 0;
        let redirect = item.redirect;
        const { component } = item;

        // 有子节点，但是没有声明 redirect 重定向的子节点地址，自动查找第一个具有路由的子节点
        if (hasChildren && !redirect) {
          redirect = addRedirect(item.children!);
        }

        let element: React.ReactNode | null = null;
        if (redirect) element = <Navigate to={redirect!} replace />;
        else if (component) element = createElement(component);

        const routerItem: RouteObject = {
          path: item.path,
          element: element,
        };
        if (hasChildren) {
          reactRoutes.push({
            ...routerItem,
            children: genBaseRcRoutes(item.children!),
          });
        } else {
          reactRoutes.push(routerItem);
        }
      }
      return reactRoutes;
    }

    return genBaseRcRoutes(authRoutes);
  }, [authRoutes]);

  console.log(test);

  const renderRoutes = useMemo(() => {
    function genAuthRoutes(routes: IRouter[]): React.ReactNode {
      return routes.map((route) => {
        const { component, path, children, redirect, layout, meta } = route;
        const access = meta?.access;

        if (children) return genAuthRoutes(children);

        if (redirect) {
          return <Route key={path} path={path} element={<Navigate to={redirect} replace />} />;
        }

        if (component) {
          const el = (
            <Route
              key={path}
              path={path}
              element={<PageLayout layout={layout}>{createElement(component)}</PageLayout>}
            />
          );

          if (!access) return el;

          const hasAccess = validateAccess(currentUser?.role || [], access);
          return hasAccess ? el : null;
        }
        return null;
      });
    }

    return genAuthRoutes(routes);
  }, [routes, currentUser]);

  return <Routes>{renderRoutes}</Routes>;
});

export default RednerRoutes;
