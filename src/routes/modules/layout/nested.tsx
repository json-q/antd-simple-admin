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
    path: "nested",
    title: "route.nest",
    icon: <ProductOutlined />,
    children: [
      {
        title: "route.nest.menu1",
        path: "menu1",
        children: [
          {
            title: "route.nest.menu1.m1",
            path: "menu1-1",
            children: [
              {
                title: "route.nest.menu1.m1.m1",
                path: "menu1-1-1",
                element: <Menu111 />,
              },
              {
                title: "route.nest.menu1.m1.m2",
                path: "menu1-1-2",
                element: <Menu112 />,
              },
            ],
          },
          {
            title: "route.nest.menu1.m2",
            path: "menu1-2",
            element: <Menu12 />,
          },
        ],
      },
      {
        title: "route.nest.menu2",
        path: "menu2",
        element: <Menu2 />,
      },
    ],
  },
];

export default nested;
