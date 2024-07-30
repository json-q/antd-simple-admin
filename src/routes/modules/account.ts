import { lazy } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { IRouteObject } from "..";

const account: IRouteObject[] = [
  {
    path: "/account",
    title: "个人页",
    icon: UserOutlined,
    children: [
      {
        title: "个人中心",
        path: "/account/center",
        component: lazy(
          () => import(/* webpackChunkName: "Account_Center" */ "@/pages/account/center"),
        ),
      },
      {
        title: "个人设置",
        path: "/account/settings",
        component: lazy(
          () => import(/* webpackChunkName: "Account_Settings" */ "@/pages/account/settings"),
        ),
      },
    ],
  },
];

export default account;
