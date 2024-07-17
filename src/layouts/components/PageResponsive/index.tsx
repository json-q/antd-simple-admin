import { Layout } from "antd";
import PageSider from "../PageSider";
import PageHeader from "../PageHeader";
import PageContent from "../PageContent";

interface PageResponsiveProps {
  children: React.ReactNode;
}

const PageResponsive: React.FC<PageResponsiveProps> = ({ children }) => {
  return (
    <Layout>
      <PageSider />
      <Layout>
        <PageHeader />
        <PageContent>{children}</PageContent>
      </Layout>
    </Layout>
  );
};

export default PageResponsive;
