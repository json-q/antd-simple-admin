import { createStyles } from "antd-style";

const useHeaderStyles = createStyles(({ css, token }) => ({
  header: css`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    padding: 0 ${token.paddingSM}px;
    height: ${token.customHeaderHeight}px;
    background-color: ${token.colorBgContainer};
    border-bottom: 1px solid ${token.colorBorderSecondary};
  `,
}));

export default useHeaderStyles;
