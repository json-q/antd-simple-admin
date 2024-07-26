import { memo, useEffect } from "react";
import { Layout } from "antd";
import { useResponsive } from "antd-style";
import { useSelector } from "@/stores";
import useSiderStyles from "./styles";

const { Sider } = Layout;

interface BaseSiderProps {
  children?: React.ReactNode;
}

export interface SiderContextType {
  collapsed: boolean;
}

const BaseSider: React.FC<BaseSiderProps> = memo(({ children }) => {
  const { styles } = useSiderStyles();
  const { md, lg } = useResponsive();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  useEffect(() => {
    // 小屏模式下，Menu 在 Drawer 里的 Sider 一直展开
    if (md === false) actionCollapsed(false);
    // 在小屏 md 和中屏 lg 之间时，sider 处于收缩态，防止从小屏拉到中屏时 sider 展开
    else if (md === true && lg === false) actionCollapsed(true);
  }, [md, lg]);

  return (
    <Sider
      trigger={null}
      width={210}
      className={styles.sider}
      collapsed={collapsed}
      onCollapse={actionCollapsed}
      breakpoint="lg"
      onBreakpoint={actionCollapsed}
    >
      {children}
    </Sider>
  );
});

export default BaseSider;
