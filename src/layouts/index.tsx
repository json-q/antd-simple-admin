import { memo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageResponsive from "./components/PageResponsive";
import useRouteMatch from "@/hooks/useRouteMatch";
import LazyLoading from "./common/LazyLoading";

const PageLayout: React.FC = memo(() => {
  const { matchRoute } = useRouteMatch();

  // 路由统一懒加载
  const lazyChildren = (
    <Suspense fallback={<LazyLoading />}>
      <Outlet />
    </Suspense>
  );

  if (matchRoute?.layout === false) {
    return lazyChildren;
  }

  return <PageResponsive>{lazyChildren}</PageResponsive>;
});

export default PageLayout;
