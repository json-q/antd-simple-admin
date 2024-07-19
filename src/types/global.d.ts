import "antd-style";

interface BizToken {
  customHeaderHeight: number;
}

declare module "antd-style" {
  export interface CustomToken extends BizToken {}
}
