import { createStyles } from "antd-style";

const useLogoStyles = createStyles(({ css, token }) => ({
  logo: css`
    height: ${token.customHeaderHeight}px;
    color: ${token.colorText};
    background-color: transparent;
  `,
}));

export default useLogoStyles;
