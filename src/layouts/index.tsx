import { memo, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading";
import { useSelector } from "@/stores";
import PageResponsive from "./components/PageResponsive";

const PageLayout: React.FC = memo(() => {
  const { matchRoute } = useSelector(["matchRoute"]);

  // 路由统一懒加载
  const lazyOutlet = (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );

  // 不存在的路由 / 路由为
  if (matchRoute?.layout === false) {
    return lazyOutlet;
  }

  return <PageResponsive>{lazyOutlet}</PageResponsive>;
});

export default PageLayout;
