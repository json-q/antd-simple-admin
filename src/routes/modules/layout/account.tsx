import { lazy } from "react";
import { UserOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Center = lazy(() => import("@/pages/account/center"));
const Settings = lazy(() => import("@/pages/account/settings"));

const account: IRouteObject[] = [
  {
    order: 7,
    path: "account",
    title: "个人页",
    icon: <UserOutlined />,
    children: [
      {
        title: "个人中心",
        path: "center",
        element: <Center />,
      },
      {
        title: "个人设置",
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];

export default account;
