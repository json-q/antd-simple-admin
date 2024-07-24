import { Layout } from "antd";
import { useResponsive } from "ahooks";
import { useSelector } from "@/stores";
import PageSider from "../PageSider";
import PageHeader from "../PageHeader";
import PageContent from "../PageContent";

interface PageResponsiveProps {
  children: React.ReactNode;
}

const PageResponsive: React.FC<PageResponsiveProps> = ({ children }) => {
  const { actionResponseMd } = useSelector(["actionResponseMd", "responseMd"]);
  const { md } = useResponsive();
  actionResponseMd(md);

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
};

export default PageResponsive;
