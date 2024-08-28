import common from "./common.json";

const zh_CNModule = import.meta.glob<true, string, Record<string, string>>(
  ["../../**/lang/zh_CN.json", "../../**/lang/zh_CN.ts"],
  { eager: true },
);

let zh_CN: Record<string, string> = {};

Object.keys(zh_CNModule).forEach((key) => {
  const mod = zh_CNModule[key].default || {};
  zh_CN = { ...zh_CN, ...mod };
});

export default {
  ...common,
  ...zh_CN,
};
