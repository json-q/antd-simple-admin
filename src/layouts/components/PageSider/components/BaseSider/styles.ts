import { createStyles } from "antd-style";

const useSiderStyles = createStyles(({ css, token }) => ({
  sider: css`
    height: 100%;
    border-right: 1px solid ${token.colorBorderSecondary};

    &.ant-layout-sider {
      background: ${token.colorBgContainer};
    }
  `,
}));

export default useSiderStyles;
