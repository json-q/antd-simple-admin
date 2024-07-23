import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import HeaderBreadcrumb from "./components/HeaderBreadcrumb";
import PersonAction from "./components/PersonAction";
import LayoutSetting from "./components/LayoutSetting";
import Notify from "./components/Notify";
import useHeaderStyles from "./styles";
import FullScreen from "./components/FullScreen";
import SearchPage from "./components/SearchPage";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { styles } = useHeaderStyles();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  return (
    <Header className={styles.header}>
      <Flex gap={8} align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => actionCollapsed(!collapsed)}
        />
        <HeaderBreadcrumb />
      </Flex>

      <div className="flex-auto"></div>

      <Flex gap={12} align="center">
        <SearchPage />
        <Notify />
        <FullScreen />
        <PersonAction />
        <LayoutSetting />
      </Flex>
    </Header>
  );
};

export default PageHeader;
