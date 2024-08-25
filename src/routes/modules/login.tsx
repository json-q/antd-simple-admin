import { lazy } from "react";
import type { IRouteObject } from "..";

const Login = lazy(() => import("@/pages/login"));

const login: IRouteObject[] = [
  {
    path: "/login",
    title: "menu.login",
    element: <Login />,
  },
];

export default login;
