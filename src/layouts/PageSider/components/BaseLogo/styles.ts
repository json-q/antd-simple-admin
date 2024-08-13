import { createStyles } from "antd-style";
import type { MenuTheme } from "antd";
import type { ManyLayout } from "@/stores/modules/layoutSlice";

type LogoStylesProps = {
  menuMode: MenuTheme;
  md: boolean;
  layout?: ManyLayout;
};

const useLogoStyles = createStyles(({ css, token }, props: LogoStylesProps) => {
  const { menuMode, md, layout } = props;
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
      border-right: ${layout === "top" || menuMode === "dark" || !md
        ? "none"
        : `1px solid ${token.colorBorderSecondary}`};
      border-bottom: ${layout === "top" ? `1px solid ${token.colorBorderSecondary}` : "none"};
      color: ${color};
      background-color: ${md ? bg : token.colorBgContainer};
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