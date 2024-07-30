import { lazy } from "react";

import login from "./modules/login";
import dashboard from "./modules/dashboard";
import form from "./modules/form";
import list from "./modules/list";
import profile from "./modules/profile";
import result from "./modules/result";
import exception from "./modules/exception";
import account from "./modules/account";
import auth from "./modules/auth";
import nested from "./modules/nested";
import type { AuthRouteObject, IRouter } from "./types";

export type IRouteObject = AuthRouteObject<IRouter>;

const routes: IRouteObject[] = [
  {
    path: "/",
    redirect: "/dashboard/analysis",
    index: true,
  },
  ...login,
  ...dashboard,
  ...form,
  ...list,
  ...profile,
  ...result,
  ...exception,
  ...account,
  ...auth,
  ...nested,
  {
    path: "*",
    component: lazy(() => import(/* webpackChunkName: "404" */ "@/pages/exception/404")),
    layout: false,
  },
];

export default routes;
