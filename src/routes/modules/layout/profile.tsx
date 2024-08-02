import { lazy } from "react";
import { ProfileOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Basic = lazy(() => import("@/pages/profile/basic"));
const Advanced = lazy(() => import("@/pages/profile/advanced"));

const profile: IRouteObject[] = [
  {
    order: 4,
    path: "/profile",
    title: "详情页",
    icon: <ProfileOutlined />,
    children: [
      {
        title: "基础详情页",
        path: "/profile/basic",
        element: <Basic />,
      },
      {
        title: "高级详情页",
        path: "/profile/advanced",
        element: <Advanced />,
      },
    ],
  },
];

export default profile;
