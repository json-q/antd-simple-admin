import { lazy } from "react";
import { WarningOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const exception: IRouter[] = [
  {
    path: "/exception",
    title: "异常页",
    icon: WarningOutlined,
    children: [
      {
        title: "403",
        path: "/exception/403",
        component: lazy(
          () => import(/* webpackChunkName: "Exception_403" */ "@/pages/exception/403"),
        ),
      },
      {
        title: "404",
        path: "/exception/404",
        component: lazy(
          () => import(/* webpackChunkName: "Exception_404" */ "@/pages/exception/404"),
        ),
      },
      {
        title: "500",
        path: "/exception/500",
        component: lazy(
          () => import(/* webpackChunkName: "Exception_500" */ "@/pages/exception/500"),
        ),
      },
    ],
  },
];

export default exception;
