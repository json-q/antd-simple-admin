import { lazy } from "react";
import type { IRouteObject } from "..";

const login: IRouteObject[] = [
  {
    path: "/login",
    title: "登录页",
    component: lazy(() => import(/* webpackChunkName: "Login" */ "@/pages/login")),
    layout: false,
  },
];

export default login;
