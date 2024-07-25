import { createElement, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes, { type IRouter } from "@/routes";
import PageLayout from "@/layouts";

/**
 * 渲染应用路由
 * @param routes
 */
const renderRoutes = (routes: IRouter[]): React.ReactNode => {
  return routes.map((route) => {
    const { component, path, children, redirect, layout } = route;

    if (children) return renderRoutes(children);

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

    return null;
  });
};

const RootRoutes: React.FC = memo(() => {
  return <Routes>{renderRoutes(routes)}</Routes>;
});

export default RootRoutes;
