import { createStyles } from "antd-style";

function hexToRgba(hex: string, alpha = 1.0) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const useLoginPageStyles = createStyles(({ css, token, responsive }) => ({
  loginPageBg: css`
    z-index: 1;
    pointer-events: none;
    position: absolute;
    top: -250px;
    left: 50%;
    transform: translateX(-50%) scale(1.5);
    width: 600px;
    height: 400px;
    opacity: 0.2;
    filter: blur(69px);
    will-change: transform;
    background: linear-gradient(
      135deg,
      ${token.gradientColor3} 0%,
      ${token.gradientColor1} 30%,
      ${token.red} 70%,
      ${token.cyan} 100%
    );
    background-size: 200% 200%;
    animation: glow 10s ease infinite;

    @keyframes glow {
      0% {
        background-position: 0 -100%;
      }

      50% {
        background-position: 200% 50%;
      }

      100% {
        background-position: 0 -100%;
      }
    }

    ${responsive.mobile} {
      width: 200px;
      height: 300px;
    }
  `,
  bgContainer: css`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${token.paddingMD}px;
  `,
  theme: css`
    position: absolute;
    top: 10px;
    right: 10px;
  `,
  form: css`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: ${token.paddingXL}px;
    background-color: ${hexToRgba(token.colorBgContainer, 0.5)};
    border-radius: ${token.borderRadius}px;
    border: 1px solid ${token.colorBorderSecondary};
    overflow: auto;
  `,
}));

export default useLoginPageStyles;
