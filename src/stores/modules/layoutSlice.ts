import type { MenuTheme } from "antd";
import type { ResponsiveKey, ThemeAppearance } from "antd-style";
import type { StateCreator } from "zustand";

type Responsive = Partial<Record<ResponsiveKey, boolean>>;

type ManyLayout = "side" | "top" | "mixin";

export type LayoutSliceType = {
  menuMode: MenuTheme;
  themeMode: ThemeAppearance;
  collapsed: boolean;
  responsive: Responsive;
  sizeMode: "default" | "compact";
  layout: ManyLayout;
  colorPrimary: string;
  borderRadius: number;
  actionThemeMode: (themeMode: ThemeAppearance) => void;
  actionMenuMode: (themeMode: MenuTheme) => void;
  actionCollapsed: (collapsed: boolean) => void;
  actionResponsive: (responsive: Responsive) => void;
  actionSizeMode: (sizeMode: "default" | "compact") => void;
  actionLayout: (layout: ManyLayout) => void;
  actionColorPrimary: (colorPrimary: string) => void;
  actionBorderRadius: (borderRadius: number) => void;
};

// zustand TS 切片用法：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const layoutSlice: StateCreator<
  LayoutSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  themeMode: "light",
  menuMode: "light",
  collapsed: true,
  responsive: {},
  sizeMode: "default",
  layout: "side",
  colorPrimary: "#1677ff",
  borderRadius: 6,
  actionThemeMode: (themeMode) => set({ themeMode }),
  actionMenuMode: (menuMode) => set({ menuMode }),
  actionCollapsed: (collapsed) => set({ collapsed }),
  actionResponsive: (responsive) => set({ responsive }),
  actionSizeMode: (sizeMode) => set({ sizeMode }),
  actionLayout: (layout) => set({ layout }),
  actionColorPrimary: (colorPrimary) => set({ colorPrimary }),
  actionBorderRadius: (borderRadius) => set({ borderRadius }),
});

export default layoutSlice;
