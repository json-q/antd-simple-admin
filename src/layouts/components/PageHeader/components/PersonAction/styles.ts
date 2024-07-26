import { createStyles } from "antd-style";

const usePersonActionStyles = createStyles(({ css, token }) => ({
  personWrapper: css`
    line-height: ${token.customHeaderHeight}px;
    cursor: pointer;

    > .name {
      color: ${token.colorTextTertiary};
    }
  `,
}));

export default usePersonActionStyles;
