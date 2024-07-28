import { lazy } from "react";
import { VerifiedOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const auth: IRouter[] = [
  {
    path: "/auth",
    title: "权限示例",
    icon: VerifiedOutlined,
    children: [
      {
        title: "Admin页面",
        path: "/auth/admin",
        component: lazy(() => import(/* webpackChunkName: "Auth_Admin" */ "@/pages/auth/admin")),
        meta: { access: "admin" },
      },
      {
        title: "User页面",
        path: "/auth/user",
        component: lazy(() => import(/* webpackChunkName: "Auth_User" */ "@/pages/auth/user")),
        meta: { access: ["admin", "user"] },
      },
    ],
  },
];

export default auth;
