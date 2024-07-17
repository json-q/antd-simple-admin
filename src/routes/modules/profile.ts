import { lazy } from "react";
import { ProfileOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const profile: IRouter[] = [
  {
    path: "/profile",
    title: "详情页",
    icon: ProfileOutlined,
    children: [
      {
        title: "基础详情页",
        path: "/profile/basic",
        component: lazy(
          () => import(/* webpackChunkName: "Profile_Basic" */ "@/pages/profile/basic"),
        ),
      },
      {
        title: "高级详情页",
        path: "/profile/advanced",
        component: lazy(
          () => import(/* webpackChunkName: "Profile_Advanced" */ "@/pages/profile/advanced"),
        ),
      },
    ],
  },
];

export default profile;
