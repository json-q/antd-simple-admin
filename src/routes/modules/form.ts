import { lazy } from "react";
import { FormOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const form: IRouter[] = [
  {
    path: "/form",
    title: "表单页",
    icon: FormOutlined,
    children: [
      {
        title: "基础表单",
        path: "/form/basic-form",
        component: lazy(
          () => import(/* webpackChunkName: "Form_BasicForm" */ "@/pages/form/basic-form"),
        ),
      },
      {
        title: "分步表单",
        path: "/form/step-form",
        component: lazy(
          () => import(/* webpackChunkName: "Form_StepForm" */ "@/pages/form/step-form"),
        ),
      },
      {
        title: "高级表单",
        path: "/form/advanced-form",
        component: lazy(
          () => import(/* webpackChunkName: "Form_AdvancedForm" */ "@/pages/form/advanced-form"),
        ),
      },
    ],
  },
];

export default form;
