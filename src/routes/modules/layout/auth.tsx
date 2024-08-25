import { lazy } from "react";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Admin = lazy(() => import("@/pages/auth/admin"));
const User = lazy(() => import("@/pages/auth/user"));

const auth: IRouteObject[] = [
  {
    order: 2,
    path: "auth",
    title: "route.role",
    icon: <SafetyCertificateOutlined />,
    children: [
      {
        title: "route.role.admin",
        path: "admin",
        element: <Admin />,
        meta: { access: "admin" },
      },
      {
        title: "route.role.user",
        path: "user",
        element: <User />,
        meta: { access: ["admin", "user"] },
      },
    ],
  },
];

export default auth;
