import { createStyles } from "antd-style";

const useSiderStyles = createStyles(({ css, token }) => ({
  sider: css`
    height: calc(100vh - ${token.customHeaderHeight}px);

    &.ant-layout-sider {
      background: ${token.colorBgContainer};
    }
  `,
}));

export default useSiderStyles;
