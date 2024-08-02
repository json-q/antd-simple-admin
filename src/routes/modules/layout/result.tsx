import { lazy } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Success = lazy(() => import("@/pages/result/fail"));
const Fail = lazy(() => import("@/pages/result/fail"));

const result: IRouteObject[] = [
  {
    order: 5,
    path: "/result",
    title: "结果页",
    icon: <CheckCircleOutlined />,
    children: [
      {
        title: "成功页",
        path: "/result/success",
        element: <Success />,
      },
      {
        title: "失败页",
        path: "/result/fail",
        element: <Fail />,
      },
    ],
  },
];

export default result;
