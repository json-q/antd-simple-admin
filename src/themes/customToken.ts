import type { GetCustomToken } from "antd-style";

declare module "antd-style" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface CustomToken extends BizToken {}
}

export interface BizToken {
  /**
   * @title layout header 高度
   */
  customHeaderHeight: number;
  /**
   * @title 渐变色1
   */
  gradientColor1: string;
  /**
   * @title 渐变色2
   */
  gradientColor2: string;
  /**
   * @title 渐变色3
   */
  gradientColor3: string;
}

export const createCustomToken: GetCustomToken<BizToken> = ({ isDarkMode, token }) => {
  const gradientColor1 = token.blue;
  const gradientColor2 = isDarkMode ? token.pink : token.cyan;
  const gradientColor3 = token.purple;

  return {
    customHeaderHeight: 56,

    gradientColor1,
    gradientColor2,
    gradientColor3,
  };
};
