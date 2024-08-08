import { createStyles } from "antd-style";

const useMenuWrapperStyles = createStyles(({ css, token }) => ({
  menuWrapper: css`
    width: 100%;
    height: calc(100% - ${token.customHeaderHeight}px);
  `,
}));

export default useMenuWrapperStyles;
