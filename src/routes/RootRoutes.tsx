import { createElement, memo, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDeepCompareEffect } from "ahooks";
import routes, { type IRouter } from "@/routes";
import PageLayout from "@/layouts";
import { useSelector } from "@/stores";
import { validateAccess } from "@/hooks/useAccess";
import { genAuthRoutes } from "./utils";

const RootRoutes: React.FC = memo(() => {
  const { currentUser, authRoutes, actionAuthRoutes } = useSelector([
    "currentUser",
    "authRoutes",
    "actionAuthRoutes",
  ]);
  console.log(authRoutes);

  useDeepCompareEffect(() => {
    actionAuthRoutes(genAuthRoutes(routes, currentUser?.role));
  }, [routes, currentUser]);

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

export default RootRoutes;
