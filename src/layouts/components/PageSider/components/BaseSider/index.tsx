import { memo, useState } from "react";
import { Layout } from "antd";
import useSiderStyles from "./styles";

const { Sider } = Layout;

interface BaseSiderProps {
  children?: React.ReactNode;
}

const BaseSider: React.FC<BaseSiderProps> = memo(({ children }) => {
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
      {children}
    </Sider>
  );
});

export default BaseSider;
