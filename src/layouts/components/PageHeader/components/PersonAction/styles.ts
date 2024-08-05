import { createStyles } from "antd-style";

const usePersonActionStyles = createStyles(({ css, token }) => ({
  personWrapper: css`
    height: ${token.customHeaderHeight}px;
    line-height: ${token.customHeaderHeight}px;
    cursor: pointer;

    > .name {
      color: ${token.colorTextTertiary};
    }
  `,
}));

export default usePersonActionStyles;
