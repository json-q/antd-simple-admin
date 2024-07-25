import { createContext, memo, useEffect } from "react";
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

export const SiderContext = createContext<SiderContextType | null>(null);

const BaseSider: React.FC<BaseSiderProps> = memo(({ children }) => {
  const { styles } = useSiderStyles();
  const { md } = useResponsive();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  useEffect(() => {
    // 小屏模式下，Menu 在 Drawer 里的 Sider 一直展开
    if (md === false) actionCollapsed(false);
  }, [md]);

  return (
    <Sider
      trigger={null}
      width={210}
      className={styles.sider}
      collapsed={collapsed}
      onCollapse={(collapsed) => {
        md && actionCollapsed(collapsed);
      }}
      breakpoint="lg"
      onBreakpoint={actionCollapsed}
    >
      {children}
    </Sider>
  );
});

export default BaseSider;
