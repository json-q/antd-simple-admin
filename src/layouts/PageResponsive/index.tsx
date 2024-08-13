import { memo, useMemo } from "react";
import isEqual from "react-fast-compare";
import { Layout, Watermark } from "antd";
import { useResponsive } from "antd-style";
import { useDeepCompareEffect } from "ahooks";
import { useSelector } from "@/stores";
import PageSider from "../PageSider";
import PageHeader from "../PageHeader";
import PageContent from "../PageContent";

interface PageResponsiveProps {
  children: React.ReactNode;
}

// content props repeat rendering caused  watermark content render error
const MemoizedWatermark = memo(Watermark, isEqual);

const PageResponsive: React.FC<PageResponsiveProps> = memo(({ children }) => {
  const responsive = useResponsive(); // 768
  const { actionResponsive, layout, watermark, currentUser } = useSelector([
    "actionResponsive",
    "layout",
    "watermark",
    "currentUser",
  ]);

  useDeepCompareEffect(() => {
    actionResponsive(responsive);
  }, [responsive]);

  const content = useMemo(() => {
    const baseContent = ["antd simple admin"];
    currentUser?.nickName && baseContent.push(currentUser?.nickName);
    return watermark ? baseContent : "";
  }, [watermark, currentUser]);

  if (responsive.md) {
    return (
      <MemoizedWatermark content={content} className="h-full">
        <Layout>
          <Watermark />
          {layout !== "top" && <PageSider />}
          <Layout>
            <PageHeader />
            <PageContent>{children}</PageContent>
          </Layout>
        </Layout>
      </MemoizedWatermark>
    );
  }

  return (
    <MemoizedWatermark content={content} className="h-full">
      <Layout>
        <div className="w-full h-full">
          <PageHeader />
          <PageContent>{children}</PageContent>
        </div>
      </Layout>
    </MemoizedWatermark>
  );
});

export default PageResponsive;
