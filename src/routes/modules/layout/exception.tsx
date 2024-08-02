import { lazy } from "react";
import { WarningOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const NoPermission = lazy(() => import("@/pages/exception/403"));
const NotFound = lazy(() => import("@/pages/exception/404"));
const ServerError = lazy(() => import("@/pages/exception/500"));

const exception: IRouteObject[] = [
  {
    order: 6,
    path: "/exception",
    title: "异常页",
    icon: <WarningOutlined />,
    children: [
      {
        title: "403",
        path: "/exception/403",
        element: <NoPermission />,
      },
      {
        title: "404",
        path: "/exception/404",
        element: <NotFound />,
      },
      {
        title: "500",
        path: "/exception/500",
        element: <ServerError />,
      },
    ],
  },
];

export default exception;
