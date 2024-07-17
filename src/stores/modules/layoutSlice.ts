import type { StateCreator } from "zustand";

export type GlobalThemeMode = "light" | "dark";
export type SizeModeType = "default" | "small";

export type LayoutSliceType = {
  themeMode: GlobalThemeMode;
  actionThemeMode: (themeMode: GlobalThemeMode) => void;
};

// zustand TS 切片用法：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const layoutSlice: StateCreator<LayoutSliceType> = () => ({
  themeMode: "light",
  actionThemeMode: (themeMode) => ({ themeMode }),
  // resetSettings: () =>
  //   set(() => ({
  //     colorPrimary: "#1677ff",
  //     themeMode: "light",
  //     layoutMode: "sider",
  //     sizeMode: "default",
  //   })),
});

export default layoutSlice;
