import { createElement, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes, { type IRouter } from "@/routes";
import PageLayout from "@/layouts";

type TRenderRoutesEl = (routes: IRouter[]) => React.ReactNode;

/**
 * 渲染应用路由
 * @param routes
 */
const renderRoutes: TRenderRoutesEl = (routes) => {
  return routes.map((route) => {
    const { component, path, children, redirect, layout } = route;

    if (redirect) {
      return <Route key={path} path={path} element={<Navigate to={redirect} replace />} />;
    }

    if (component) {
      return (
        <Route
          key={path}
          path={path}
          element={<PageLayout layout={layout}>{createElement(component)}</PageLayout>}
        />
      );
    }

    return children ? renderRoutes(children) : null;
  });
};

const RootRoutes: React.FC = memo(() => {
  return <Routes>{renderRoutes(routes)}</Routes>;
});

export default RootRoutes;
