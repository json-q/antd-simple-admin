import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import useHeaderStyles from "./styles";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { styles } = useHeaderStyles();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  return (
    <Header className={styles.header}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => actionCollapsed(!collapsed)}
      />
    </Header>
  );
};

export default PageHeader;
