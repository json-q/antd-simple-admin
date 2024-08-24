import { createStyles } from "antd-style";
import { LayoutEnum } from "@/enums";

const siderBg = "#001529";

export default createStyles(({ css, token }, props: LayoutEnum) => ({
  container: css`
    position: relative;
    box-sizing: border-box;
    width: 5em;
    height: 4em;
    overflow: hidden;
    background-color: ${token.colorBgLayout};
    cursor: pointer;
    border-radius: ${token.borderRadius}px;
    border: 1px solid ${token.colorBorder};
    box-shadow: ${token.boxShadow};

    &::before {
      position: absolute;
      width: 25%;
      height: 100%;
      content: "";
      inset-block-start: 0;
      inset-inline-start: 0;
      background-color: ${siderBg};
      z-index: ${props === LayoutEnum.Side ? 2 : 1};
      opacity: ${props === LayoutEnum.Top ? 0 : 1};
    }

    &::after {
      position: absolute;
      width: 100%;
      height: 25%;
      content: "";
      inset-block-start: 0;
      inset-inline-start: 0;
      z-index: 1;
      background-color: ${props === LayoutEnum.Top ? siderBg : token.colorBgContainer};
    }
  `,

  selectedContainer: css`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 24px;
    height: 24px;
    background-image: linear-gradient(
      -45deg,
      ${token.colorPrimary} 50%,
      rgba(255, 255, 255, 0) 50%
    );
  `,

  selectedIcon: css`
    position: absolute;
    bottom: 0;
    right: 1px;
    font-size: 12px;
    color: #fff;
  `,
}));
