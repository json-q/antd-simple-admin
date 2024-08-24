import type { ResponsiveKey } from "antd-style";
import type { StateCreator } from "zustand";
import { LayoutEnum, MenuModeEnum, SizeModeEnum, ThemeModeEnum } from "@/enums";

type Responsive = Partial<Record<ResponsiveKey, boolean>>;

export type LayoutSliceType = {
  menuMode: MenuModeEnum;
  themeMode: ThemeModeEnum;
  collapsed: boolean;
  responsive: Responsive;
  sizeMode: SizeModeEnum;
  layout: LayoutEnum;
  colorPrimary: string;
  borderRadius: number;
  watermark: boolean;
  actionThemeMode: (themeMode: ThemeModeEnum) => void;
  actionMenuMode: (themeMode: MenuModeEnum) => void;
  actionCollapsed: (collapsed: boolean) => void;
  actionResponsive: (responsive: Responsive) => void;
  actionSizeMode: (sizeMode: SizeModeEnum) => void;
  actionLayout: (layout: LayoutEnum) => void;
  actionColorPrimary: (colorPrimary: string) => void;
  actionBorderRadius: (borderRadius: number) => void;
  actionWatermark: (watermark: boolean) => void;
  resetSetting: () => void;
};

// zustand TS 切片用法：https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern

const layoutSlice: StateCreator<
  LayoutSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  themeMode: ThemeModeEnum.Light,
  menuMode: MenuModeEnum.Light,
  collapsed: true,
  responsive: {},
  sizeMode: SizeModeEnum.Default,
  layout: LayoutEnum.Side,
  colorPrimary: "#1677ff",
  borderRadius: 6,
  watermark: true,
  actionThemeMode: (themeMode) => set({ themeMode }),
  actionMenuMode: (menuMode) => set({ menuMode }),
  actionCollapsed: (collapsed) => set({ collapsed }),
  actionResponsive: (responsive) => set({ responsive }),
  actionSizeMode: (sizeMode) => set({ sizeMode }),
  actionLayout: (layout) => set({ layout }),
  actionColorPrimary: (colorPrimary) => set({ colorPrimary }),
  actionBorderRadius: (borderRadius) => set({ borderRadius }),
  actionWatermark: (watermark) => set({ watermark }),
  resetSetting: () =>
    set({
      themeMode: ThemeModeEnum.Light,
      menuMode: MenuModeEnum.Light,
      sizeMode: SizeModeEnum.Default,
      layout: LayoutEnum.Side,
      colorPrimary: "#1677ff",
      borderRadius: 6,
      watermark: true,
    }),
});

export default layoutSlice;
