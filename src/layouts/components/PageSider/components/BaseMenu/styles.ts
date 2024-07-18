import { createStyles } from "antd-style";

const useMenuWrapperStyles = createStyles(({ css }) => ({
  menuWrapper: css`
    height: 100%;

    .simplebar-content {
      height: 100%;
    }
  `,
}));

export default useMenuWrapperStyles;
