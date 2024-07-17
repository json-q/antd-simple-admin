import { lazy } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const result: IRouter[] = [
  {
    path: "/result",
    title: "结果页",
    icon: CheckCircleOutlined,
    children: [
      {
        title: "成功页",
        path: "/result/success",
        component: lazy(
          () => import(/* webpackChunkName: "Result_Success" */ "@/pages/result/success"),
        ),
      },
      {
        title: "失败页",
        path: "/result/fail",
        component: lazy(() => import(/* webpackChunkName: "Result_Fail" */ "@/pages/result/fail")),
      },
    ],
  },
];

export default result;
