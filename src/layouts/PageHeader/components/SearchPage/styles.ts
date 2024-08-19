import { createStyles } from "antd-style";

const useSearchStyles = createStyles(({ css, token }) => ({
  searchContent: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: ${token.paddingContentVerticalLG}px 0;
  `,
  searchItem: css`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: ${token.paddingSM}px;
    border: 1px solid ${token.colorBorderSecondary};
    border-radius: ${token.borderRadius}px;
    transition: all 0.2s ease;

    &:hover,
    &.hover {
      background-color: ${token.colorBgTextHover};
    }

    &.active {
      color: ${token.colorTextLightSolid};
      background-color: ${token.colorPrimary};
    }
  `,
}));

export default useSearchStyles;
