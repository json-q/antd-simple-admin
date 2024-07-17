import { memo, Suspense } from "react";
import { Layout } from "antd";
import LazyLoading from "./common/LazyLoading";
import PageSider from "./components/PageSider";
import PageHeader from "./components/PageHeader";

const { Content } = Layout;

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

  return (
    <Layout className="min-h-full flex-row">
      <PageSider />
      <Layout>
        <PageHeader />
        <Content>{lazyChildren}</Content>
      </Layout>
    </Layout>
  );
});

export default PageLayout;
