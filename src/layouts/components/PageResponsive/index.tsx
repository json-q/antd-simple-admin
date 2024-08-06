import { memo } from "react";
import { Layout } from "antd";
import { useResponsive } from "antd-style";
import { useDeepCompareEffect } from "ahooks";
import { useSelector } from "@/stores";
import LayoutAnimation from "@/layouts/animation/LayoutAnimation";
import PageSider from "../PageSider";
import PageHeader from "../PageHeader";
import PageContent from "../PageContent";

interface PageResponsiveProps {
  children: React.ReactNode;
}

const PageResponsive: React.FC<PageResponsiveProps> = memo(({ children }) => {
  const responsive = useResponsive(); // 768
  const { actionResponsive } = useSelector(["actionResponsive"]);

  useDeepCompareEffect(() => {
    actionResponsive(responsive);
  }, [responsive]);

  if (responsive.md) {
    return (
      <Layout>
        <PageSider />
        <Layout>
          <PageHeader />
          <PageContent>
            <LayoutAnimation>{children}</LayoutAnimation>
          </PageContent>
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
