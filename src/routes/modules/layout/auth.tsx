import { lazy } from "react";
import { VerifiedOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Admin = lazy(() => import("@/pages/auth/admin"));
const User = lazy(() => import("@/pages/auth/user"));

const auth: IRouteObject[] = [
  {
    order: 8,
    path: "auth",
    title: "权限示例",
    icon: <VerifiedOutlined />,
    children: [
      {
        title: "Admin页面",
        path: "admin",
        element: <Admin />,
        meta: { access: "admin" },
      },
      {
        title: "User页面",
        path: "user",
        element: <User />,
        meta: { access: ["admin", "user"] },
      },
    ],
  },
];

export default auth;
