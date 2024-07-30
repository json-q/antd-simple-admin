import { lazy } from "react";
import { ProductOutlined } from "@ant-design/icons";
import type { IRouteObject } from "..";

const nested: IRouteObject[] = [
  {
    path: "/nested",
    title: "嵌套菜单",
    icon: ProductOutlined,
    children: [
      {
        title: "菜单1",
        path: "/nested/menu1",
        children: [
          {
            title: "菜单1-1",
            path: "/nested/menu1/menu1-1",
            children: [
              {
                title: "菜单1-1-1",
                path: "/nested/menu1/menu1-1/menu1-1-1",
                component: lazy(() => import("@/pages/nested/menu1/menu1-1/menu1-1-1")),
              },
              {
                title: "菜单1-1-2",
                path: "/nested/menu1/menu1-1/menu1-1-2",
                component: lazy(() => import("@/pages/nested/menu1/menu1-1/menu1-1-2")),
              },
            ],
          },
          {
            title: "菜单1-2",
            path: "/nested/menu1/menu1-2",
            component: lazy(() => import("@/pages/nested/menu1/menu1-2")),
          },
        ],
      },
      {
        title: "菜单2",
        path: "/nested/menu2",
        component: lazy(() => import("@/pages/nested/menu2")),
      },
    ],
  },
];

export default nested;
