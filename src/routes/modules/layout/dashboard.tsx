import { lazy } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Analysis = lazy(() => import("@/pages/dashboard/analysis"));
const Monitor = lazy(() => import("@/pages/dashboard/monitor"));
const Workplace = lazy(() => import("@/pages/dashboard/workplace"));

const dashboard: IRouteObject[] = [
  {
    order: 1,
    path: "dashboard",
    title: "Dashboard",
    icon: <DashboardOutlined />,
    children: [
      {
        title: "分析页",
        path: "analysis",
        element: <Analysis />,
        meta: { title: "分析页测试" },
      },
      {
        title: "监控页",
        path: "monitor",
        element: <Monitor />,
        meta: { title: "监控页测试" },
      },
      {
        title: "工作台",
        path: "workplace",
        element: <Workplace />,
      },
    ],
  },
];

export default dashboard;
