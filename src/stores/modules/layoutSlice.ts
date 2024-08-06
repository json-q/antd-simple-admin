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
  compact: boolean;
  layout: ManyLayout;
  colorPrimary: string;
  actionThemeMode: (themeMode: ThemeAppearance) => void;
  actionMenuMode: (themeMode: MenuTheme) => void;
  actionCollapsed: (collapsed: boolean) => void;
  actionResponsive: (responsive: Responsive) => void;
  actionCompact: (compact: boolean) => void;
  actionLayout: (layout: ManyLayout) => void;
  actionColorPrimary: (colorPrimary: string) => void;
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
  compact: false,
  layout: "side",
  colorPrimary: "#1677ff",
  actionThemeMode: (themeMode) => set({ themeMode }),
  actionMenuMode: (menuMode) => set({ menuMode }),
  actionCollapsed: (collapsed) => set({ collapsed }),
  actionResponsive: (responsive) => set({ responsive }),
  actionCompact: (compact) => set({ compact }),
  actionLayout: (layout) => set({ layout }),
  actionColorPrimary: (colorPrimary) => set({ colorPrimary }),
});

export default layoutSlice;
