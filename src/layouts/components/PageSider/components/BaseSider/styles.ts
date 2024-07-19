import { createStyles } from "antd-style";

const useSiderStyles = createStyles(({ css, token }) => ({
  sider: css`
    height: 100%;

    &.ant-layout-sider {
      background: ${token.colorBgContainer};
    }
  `,
}));

export default useSiderStyles;
