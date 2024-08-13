import { createStyles } from "antd-style";

const useContentStyles = createStyles(({ css, token }) => ({
  content: css`
    overflow: hidden auto;
    height: 100%;
    max-height: calc(100vh - ${token.customHeaderHeight}px);
    padding: ${token.paddingXS}px ${token.paddingSM}px;
  `,
}));

export default useContentStyles;
