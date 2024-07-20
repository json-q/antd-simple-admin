import { createContext, memo } from "react";
import { Layout } from "antd";
import useSiderStyles from "./styles";
import { useSelector } from "@/stores";

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
  const { collapsed, actionCollapsed } = useSelector(["collapsed", "actionCollapsed"]);

  return (
    <Sider
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
