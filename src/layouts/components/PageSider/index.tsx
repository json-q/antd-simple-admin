import { memo, useState } from "react";
import { Layout } from "antd";
import BaseMenu from "./components/BaseMenu";
import useSiderStyles from "./styles";

const { Sider } = Layout;

const PageSider: React.FC = memo(() => {
  const { styles } = useSiderStyles();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      width={210}
      className={styles.sider}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="lg"
      onBreakpoint={setCollapsed}
    >
      <BaseMenu />
    </Sider>
  );
});

export default PageSider;
