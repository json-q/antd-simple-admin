import { memo, Suspense } from "react";
import LazyLoading from "./common/LazyLoading";
import PageResponsive from "./components/PageResponsive";

type PageLayoutProps = {
  children?: React.ReactNode;
  layout?: boolean;
};

const PageLayout: React.FC<PageLayoutProps> = memo((props) => {
  const { children, layout } = props;

  // 路由统一懒加载
  const lazyChildren = <Suspense fallback={<LazyLoading />}>{children}</Suspense>;

  if (layout === false) {
    return lazyChildren;
  }

  return <PageResponsive>{lazyChildren}</PageResponsive>;
});

export default PageLayout;
