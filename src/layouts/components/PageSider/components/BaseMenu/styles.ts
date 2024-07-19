import { createStyles } from "antd-style";

const useMenuWrapperStyles = createStyles(({ css, token }) => ({
  menuWrapper: css`
    height: calc(100% - ${token.customHeaderHeight}px);

    & .ant-menu.ant-menu-root {
      border-inline-end: none;
    }
  `,
}));

export default useMenuWrapperStyles;
