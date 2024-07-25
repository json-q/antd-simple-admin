import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useResponsive } from "antd-style";
import { useSelector } from "@/stores";
import HeaderBreadcrumb from "./components/HeaderBreadcrumb";
import PersonAction from "./components/PersonAction";
import LayoutSetting from "./components/LayoutSetting";
import Notify from "./components/Notify";
import FullScreen from "./components/FullScreen";
import SearchPage from "./components/SearchPage";
import DrawSider from "../PageSider/DrawSider";
import BaseLogo from "../PageSider/components/BaseLogo";
import useHeaderStyles from "./styles";

const { Header } = Layout;

const PageHeader: React.FC = () => {
  const { md } = useResponsive();
  const { styles } = useHeaderStyles();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  return (
    <Header className={styles.header}>
      <Flex gap={8} align="center">
        {md ? (
          <>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => actionCollapsed(!collapsed)}
            />
            <HeaderBreadcrumb />
          </>
        ) : (
          <>
            <DrawSider />
            <BaseLogo />
          </>
        )}
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
