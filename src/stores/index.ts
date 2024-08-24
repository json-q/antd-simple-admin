import isEqual from "react-fast-compare";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import { pick } from "lodash-es";
import { StorageEnum } from "@/enums";
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
          name: StorageEnum.Settings, // 本地缓存 name=>key 。partialize 函数 => return 缓存内容
          partialize: (state) => ({
            themeMode: state.themeMode,
            menuMode: state.menuMode,
            layout: state.layout,
            colorPrimary: state.colorPrimary,
            sizeMode: state.sizeMode,
            borderRadius: state.borderRadius,
            watermark: state.watermark,
          }),
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
