import { lazy } from "react";
import type { IRouteObject } from "..";

const Login = lazy(() => import("@/pages/login"));

const login: IRouteObject[] = [
  {
    path: "/login",
    title: "登录页",
    element: <Login />,
  },
];

export default login;
