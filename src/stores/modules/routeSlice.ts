import type { StateCreator } from "zustand";
import type { IRouter } from "@/routes";

export type RoutesSliceType = {
  authRoutes: IRouter[];
  actionAuthRoutes: (authRoutes: IRouter[]) => void;
};

const routesSlice: StateCreator<
  RoutesSliceType,
  [["zustand/immer", never], ["zustand/devtools", never]]
> = (set) => ({
  authRoutes: [],
  actionAuthRoutes: (authRoutes) => set({ authRoutes }),
});

export default routesSlice;
