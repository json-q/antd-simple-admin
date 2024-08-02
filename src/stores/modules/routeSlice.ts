import type { StateCreator } from "zustand";
import type { IRouteObject } from "@/routes";
import { defaultMathRoute, TMatchRoute } from "@/hooks/useRouteMatch";

export type RoutesSliceType = {
  authRoutes: IRouteObject[];
  matchRoute: TMatchRoute;
  actionAuthRoutes: (authRoutes: IRouteObject[]) => void;
  actionMatchRoute: (matchRoute: TMatchRoute) => void;
};

const routesSlice: StateCreator<
  RoutesSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  authRoutes: [],
  matchRoute: defaultMathRoute,
  actionAuthRoutes: (authRoutes) => set({ authRoutes }),
  actionMatchRoute: (matchRoute) => set({ matchRoute }),
});

export default routesSlice;
