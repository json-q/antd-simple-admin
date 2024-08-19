import { memo, useMemo } from "react";
import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "@/stores";
import {
  HeaderBreadcrumb,
  SearchPage,
  Notify,
  PersonAction,
  FullScreen,
  LayoutSetting,
  ThemeSwitch,
} from "./components";
import DrawSider from "../PageSider/DrawSider";
import BaseLogo from "../PageSider/components/BaseLogo";
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
  } = useSelector(["collapsed", "actionCollapsed", "responsive", "layout"]);

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
          <HeaderBreadcrumb />
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
    return null;
  }, [md, collapsed, layout]);

  return (
    <Header className={styles.header}>
      <Flex gap={8} align="center" flex={1}>
        {renderHeaderNode}
      </Flex>

      <Flex gap={12} align="center">
        <SearchPage />
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
