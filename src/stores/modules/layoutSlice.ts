import type { MenuTheme } from "antd";
import type { ThemeAppearance } from "antd-style";
import type { StateCreator } from "zustand";

export type LayoutSliceType = {
  menuMode: MenuTheme;
  themeMode: ThemeAppearance;
  collapsed: boolean;
  responseMd: boolean;
  actionThemeMode: (themeMode: ThemeAppearance) => void;
  actionMenuMode: (themeMode: MenuTheme) => void;
  actionCollapsed: (collapsed: boolean) => void;
  actionResponseMd: (responseMd: boolean) => void;
};

// zustand TS 切片用法：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const layoutSlice: StateCreator<LayoutSliceType> = (set) => ({
  themeMode: "light",
  menuMode: "light",
  collapsed: false,
  responseMd: true,
  actionThemeMode: (themeMode) => set({ themeMode }),
  actionMenuMode: (menuMode) => set({ menuMode }),
  actionCollapsed: (collapsed) => set({ collapsed }),
  actionResponseMd: (responseMd) => set({ responseMd }),
  // resetSettings: () =>
  //   set(() => ({
  //     colorPrimary: "#1677ff",
  //     themeMode: "light",
  //     layoutMode: "sider",
  //     sizeMode: "default",
  //   })),
});

export default layoutSlice;
