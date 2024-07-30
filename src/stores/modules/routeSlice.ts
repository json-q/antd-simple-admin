import type { StateCreator } from "zustand";
import type { IRouteObject } from "@/routes";

export type RoutesSliceType = {
  authRoutes: IRouteObject[];
  actionAuthRoutes: (authRoutes: IRouteObject[]) => void;
};

const routesSlice: StateCreator<
  RoutesSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  authRoutes: [],
  actionAuthRoutes: (authRoutes) => set({ authRoutes }),
});

export default routesSlice;
