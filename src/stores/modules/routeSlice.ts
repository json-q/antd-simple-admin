import type { StateCreator } from "zustand";
import type { IRouteObject } from "@/routes";

export type RoutesSliceType = {
  authRoutes: IRouteObject[];
  matchRoute?: IRouteObject;
  actionAuthRoutes: (authRoutes: IRouteObject[]) => void;
  actionMatchRoute: (matchRoute?: IRouteObject) => void;
};

const routesSlice: StateCreator<
  RoutesSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  authRoutes: [],
  actionAuthRoutes: (authRoutes) => set({ authRoutes }),
  actionMatchRoute: (matchRoute) => set({ matchRoute }),
});

export default routesSlice;
