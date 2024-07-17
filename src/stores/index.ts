import isEqual from "react-fast-compare";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import layoutSlice, { type LayoutSliceType } from "./modules/layoutSlice";

export type Store = LayoutSliceType;

const useStore = createWithEqualityFn<Store>()(
  immer(
    devtools(
      persist(
        (...args) => ({
          ...layoutSlice(...args),
        }),
        {
          name: "settins-config", // 本地缓存 name=>key 。partialize 函数 => return 缓存内容
          // partialize: (state) => ({
          //   // colorPrimary: state.colorPrimary,
          //   // themeMode: state.themeMode,
          //   // layoutMode: state.layoutMode,
          //   // sizeMode: state.sizeMode,
          // }),
        },
      ),
      {
        enabled: process.env.NODE_ENV !== "production", // devtools 生产环境关闭
      },
    ),
  ),
  isEqual,
);

export default useStore;
