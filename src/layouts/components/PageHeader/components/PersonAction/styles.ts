import { createStyles } from "antd-style";

const usePersonActionStyles = createStyles(({ css, token }) => ({
  personWrapper: css`
    line-height: ${token.customHeaderHeight}px;
    cursor: default;

    > .name {
      color: ${token.colorTextTertiary};
    }
  `,
}));

export default usePersonActionStyles;
