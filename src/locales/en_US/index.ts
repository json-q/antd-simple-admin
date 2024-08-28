import common from "./common.json";

const en_USModule = import.meta.glob<true, string, Record<string, string>>(
  ["../../**/lang/en_US.json", "../../**/lang/en_US.ts"],
  { eager: true },
);

let en_US: Record<string, string> = {};

Object.keys(en_USModule).forEach((key) => {
  const mod = en_USModule[key].default || {};
  en_US = { ...en_US, ...mod };
});

export default {
  // you can add your own locale here, eg: ...common
  ...common,
  ...en_US,
};
