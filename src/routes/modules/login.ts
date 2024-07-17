import { lazy } from "react";
import type { IRouter } from "..";

const login: IRouter[] = [
  {
    path: "/login",
    title: "登录页",
    component: lazy(() => import(/* webpackChunkName: "Login" */ "@/pages/login")),
    layout: false,
  },
];

export default login;
