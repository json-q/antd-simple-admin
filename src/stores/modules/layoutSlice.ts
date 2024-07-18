import type { MenuTheme } from "antd";
import type { ThemeAppearance } from "antd-style";
import type { StateCreator } from "zustand";

export type LayoutSliceType = {
  menuMode: MenuTheme;
  themeMode: ThemeAppearance;
  actionThemeMode: (themeMode: ThemeAppearance) => void;
  actionMenuMode: (themeMode: MenuTheme) => void;
};

// zustand TS 切片用法：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const layoutSlice: StateCreator<LayoutSliceType> = (set) => ({
  themeMode: "light",
  menuMode: "light",
  actionThemeMode: (themeMode) => set({ themeMode }),
  actionMenuMode: (menuMode) => set({ menuMode }),
  // resetSettings: () =>
  //   set(() => ({
  //     colorPrimary: "#1677ff",
  //     themeMode: "light",
  //     layoutMode: "sider",
  //     sizeMode: "default",
  //   })),
});

export default layoutSlice;
