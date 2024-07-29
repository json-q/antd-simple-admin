import React, { createElement, memo, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDeepCompareEffect } from "ahooks";
import { isArray } from "lodash-es";
import routes, { type IRouter } from "@/routes";
import PageLayout from "@/layouts";
import { useSelector } from "@/stores";
import { addRedirect, genAuthRoutes } from "./utils";
import LazyLoading from "@/layouts/common/LazyLoading";

const RednerRoutes: React.FC = memo(() => {
  const { currentUser, authRoutes, actionAuthRoutes } = useSelector([
    "currentUser",
    "authRoutes",
    "actionAuthRoutes",
  ]);

  useDeepCompareEffect(() => {
    actionAuthRoutes(genAuthRoutes(routes, currentUser?.role));
  }, [routes, currentUser]);

  const renderRoutes = useMemo(() => {
    function genRoutes(routes: IRouter[]): React.ReactNode {
      return routes.map((item) => {
        const baseRoutes: React.ReactNode[] = [];

        const { component, path, children } = item;
        let redirect = item.redirect;
        const hasChildren = isArray(children) && children.length > 0;

        redirect = redirect || addRedirect(children || []);

        if (hasChildren) {
          baseRoutes.push(genRoutes(children));
        }

        if (redirect) {
          baseRoutes.push(
            <Route key={path} path={path} element={<Navigate to={redirect} replace />} />,
          );
        }

        if (component) {
          baseRoutes.push(<Route key={path} path={path} element={createElement(component)} />);
        }
        return baseRoutes;
      });
    }

    return genRoutes(authRoutes);
  }, [authRoutes, currentUser]);

  // 路由渲染完成前，渲染 loading 等待
  if (React.Children.count(renderRoutes) === 0) {
    return <LazyLoading tip="加载中" />;
  }

  return (
    <Routes>
      <Route element={<PageLayout />}>{renderRoutes}</Route>
    </Routes>
  );
});

export default RednerRoutes;
