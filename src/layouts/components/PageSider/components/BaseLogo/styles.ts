import { createStyles } from "antd-style";
import type { MenuTheme } from "antd";

type LogoStylesProps = {
  menuMode: MenuTheme;
  responseMd: boolean;
};

const useLogoStyles = createStyles(({ css, token }, props: LogoStylesProps) => {
  const { menuMode, responseMd } = props;
  // menu 的 light 模式使用默认的主题 token 即可，menu dark，logo需和 menu 的背景色一致
  const bg = menuMode === "dark" ? "#001529" : token.colorBgContainer;
  const color = menuMode === "dark" ? "#ffffff" : token.colorText;

  return {
    logo: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: ${token.customHeaderHeight}px;
      line-height: ${token.customHeaderHeight}px;
      padding: ${token.paddingContentHorizontal}px ${token.paddingContentVertical}px;
      border-right: ${responseMd ? 1 : 0}px solid ${token.colorBorderSecondary};
      color: ${color};
      background-color: ${bg};
      cursor: pointer;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 22px;
        font-size: 22px;

        > img {
          height: 22px;
          vertical-align: middle;
        }

        > h1 {
          height: ${token.lineHeightLG}em;
          margin: 0;
          color: ${color};
          font-weight: 600;
          font-size: ${token.fontSizeLG}px;
          line-height: ${token.lineHeightLG}em;
          white-space: nowrap;
          vertical-align: middle;
          animation: logo-title-animation 0.4s ease;
          margin-inline: 6px 0;

          @keyframes logo-title-animation {
            0% {
              display: none;
              overflow: hidden;
              opacity: 0;
            }

            80% {
              overflow: hidden;
            }

            100% {
              display: unset;
              opacity: 1;
            }
          }
        }
      }
    `,
  };
});

export default useLogoStyles;
