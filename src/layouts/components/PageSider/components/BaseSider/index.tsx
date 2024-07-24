import { createContext, memo, useEffect } from "react";
import { Layout } from "antd";
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
  const { responseMd } = useSelector(["responseMd"]);
  const { styles } = useSiderStyles();
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  useEffect(() => {
    // 小屏模式下，Menu 在 Drawer 里的 Sider 一直展开
    if (responseMd === false) actionCollapsed(false);
  }, [responseMd]);

  return (
    <Sider
      trigger={null}
      width={210}
      className={styles.sider}
      collapsed={collapsed}
      onCollapse={(collapsed) => responseMd && actionCollapsed(collapsed)}
      breakpoint="lg"
      onBreakpoint={actionCollapsed}
    >
      {children}
    </Sider>
  );
});

export default BaseSider;
