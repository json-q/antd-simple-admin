import { memo, useMemo } from "react";
import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import HeaderBreadcrumb from "./components/HeaderBreadcrumb";
import PersonAction from "./components/PersonAction";
import LayoutSetting from "./components/LayoutSetting";
import Notify from "./components/Notify";
import FullScreen from "./components/FullScreen";
import SearchPage from "./components/SearchPage";
import DrawSider from "../PageSider/DrawSider";
import BaseLogo from "../PageSider/components/BaseLogo";
import ThemeSwitch from "./components/ThemeSwitch";
import BaseMenu from "../PageSider/components/BaseMenu";
import useHeaderStyles from "./styles";

const { Header } = Layout;

const PageHeader: React.FC = memo(() => {
  const { styles } = useHeaderStyles();
  const {
    collapsed,
    actionCollapsed,
    responsive: { md },
    layout,
    breadcrumb,
  } = useSelector(["collapsed", "actionCollapsed", "responsive", "layout", "breadcrumb"]);

  const renderHeaderNode = useMemo(() => {
    if (md === false) {
      return (
        <>
          <DrawSider />
          <BaseLogo />
        </>
      );
    }

    if (layout === "side") {
      return (
        <>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => actionCollapsed(!collapsed)}
          />
          {breadcrumb && <HeaderBreadcrumb />}
        </>
      );
    }

    if (layout === "top") {
      return (
        <>
          <BaseLogo />
          <BaseMenu mode="horizontal" />
        </>
      );
    }
  }, [md, collapsed, layout, breadcrumb]);

  return (
    <Header className={styles.header}>
      <Flex gap={8} align="center" flex={1} style={{ height: 56 }}>
        {renderHeaderNode}
      </Flex>

      <Flex gap={12} align="center">
        {md && <SearchPage />}
        <Notify />
        <ThemeSwitch />
        {md && <FullScreen />}
        <LayoutSetting />
        <PersonAction />
      </Flex>
    </Header>
  );
});

export default PageHeader;
