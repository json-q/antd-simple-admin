import { createStyles } from "antd-style";

const useMenuWrapperStyles = createStyles(({ css }) => ({
  menuWrapper: css`
    height: 100%;
    overflow: hidden;
    scrollbar-width: thin;
    scrollbar-color: unset;

    &:hover {
      overflow-y: auto;
    }
  `,
}));

export default useMenuWrapperStyles;
