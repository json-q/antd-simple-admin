import { lazy } from "react";
import { HomeOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Home = lazy(() => import("@/pages/home"));

const account: IRouteObject[] = [
  {
    order: 1,
    path: "home",
    title: "route.home",
    icon: <HomeOutlined />,
    element: <Home />,
  },
];

export default account;
