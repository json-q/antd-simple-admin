import { lazy } from "react";
import { ProductOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Menu111 = lazy(() => import("@/pages/nested/menu1/menu1-1/menu1-1-1"));
const Menu112 = lazy(() => import("@/pages/nested/menu1/menu1-1/menu1-1-2"));
const Menu12 = lazy(() => import("@/pages/nested/menu1/menu1-2"));
const Menu2 = lazy(() => import("@/pages/nested/menu2"));

const nested: IRouteObject[] = [
  {
    order: 9,
    path: "/nested",
    title: "嵌套菜单",
    icon: <ProductOutlined />,
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
                element: <Menu111 />,
              },
              {
                title: "菜单1-1-2",
                path: "/nested/menu1/menu1-1/menu1-1-2",
                element: <Menu112 />,
              },
            ],
          },
          {
            title: "菜单1-2",
            path: "/nested/menu1/menu1-2",
            element: <Menu12 />,
          },
        ],
      },
      {
        title: "菜单2",
        path: "/nested/menu2",
        element: <Menu2 />,
      },
    ],
  },
];

export default nested;
