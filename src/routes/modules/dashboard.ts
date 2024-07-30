import { lazy } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import type { IRouteObject } from "..";

const dashboard: IRouteObject[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: DashboardOutlined,
    children: [
      {
        title: "分析页",
        path: "/dashboard/analysis",
        component: lazy(
          () => import(/* webpackChunkName: "Dashboard_Analysis" */ "@/pages/dashboard/analysis"),
        ),
        meta: { title: "分析页测试" },
      },
      {
        title: "监控页",
        path: "/dashboard/monitor",
        component: lazy(
          () => import(/* webpackChunkName: "Dashboard_Monitor" */ "@/pages/dashboard/monitor"),
        ),
        meta: { title: "监控页测试" },
      },
      {
        title: "工作台",
        path: "/dashboard/workplace",
        component: lazy(
          () => import(/* webpackChunkName: "Dashboard_Workplace" */ "@/pages/dashboard/workplace"),
        ),
      },
    ],
  },
];

export default dashboard;
