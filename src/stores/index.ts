import isEqual from "react-fast-compare";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { pick } from "lodash-es";
import layoutSlice, { type LayoutSliceType } from "./modules/layoutSlice";
import userSlice, { type UserSliceType } from "./modules/userSlice";
import routesSlice, { type RoutesSliceType } from "./modules/routeSlice";

type Store = LayoutSliceType & UserSliceType & RoutesSliceType;

const useStore = createWithEqualityFn<Store>()(
  immer(
    devtools(
      persist(
        (...args) => ({
          ...layoutSlice(...args),
          ...userSlice(...args),
          ...routesSlice(...args),
        }),
        {
          name: "settings-config", // 本地缓存 name=>key 。partialize 函数 => return 缓存内容
          partialize: () => ({}),
        },
      ),
      {
        enabled: process.env.NODE_ENV !== "production", // devtools 生产环境关闭
      },
    ),
  ),
  isEqual,
);

export const useSelector = <K extends keyof Store>(key: K[]) => {
  return useStore((state) => pick(state, key));
};

export default useStore;
