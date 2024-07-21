import { Button, Layout, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import useHeaderStyles from "./styles";
import HeaderBreadcrumb from "./components/HeaderBreadcrumb";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { styles } = useHeaderStyles();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  return (
    <Header className={styles.header}>
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => actionCollapsed(!collapsed)}
        />
        <HeaderBreadcrumb />
      </Space>
      <div className="flex-auto" />
    </Header>
  );
};

export default PageHeader;
