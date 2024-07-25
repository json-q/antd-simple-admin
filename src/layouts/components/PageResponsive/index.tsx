import { memo } from "react";
import { Layout } from "antd";
import { useResponsive } from "antd-style";
import PageSider from "../PageSider";
import PageHeader from "../PageHeader";
import PageContent from "../PageContent";

interface PageResponsiveProps {
  children: React.ReactNode;
}

const PageResponsive: React.FC<PageResponsiveProps> = memo(({ children }) => {
  const { md } = useResponsive(); // 768

  if (md) {
    return (
      <Layout>
        <PageSider />
        <Layout>
          <PageHeader />
          <PageContent>{children}</PageContent>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-full">
        <PageHeader />
        <PageContent>{children}</PageContent>
      </div>
    </Layout>
  );
});

export default PageResponsive;
