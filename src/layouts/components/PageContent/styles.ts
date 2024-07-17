import { createStyles } from "antd-style";

const useContentStyles = createStyles(({ css, token }) => ({
  content: css`
    overflow: auto;
    height: 100%;
    max-height: calc(100vh - ${token.customHeaderHeight}px);
    padding: ${token.paddingXS}px ${token.paddingSM}px;
    scrollbar-width: thin;
    scrollbar-color: unset;
  `,
}));

export default useContentStyles;
