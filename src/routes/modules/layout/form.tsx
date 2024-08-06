import { lazy } from "react";
import { FormOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const BasicForm = lazy(() => import("@/pages/form/basic-form"));
const StepForm = lazy(() => import("@/pages/form/step-form"));
const AdvancedForm = lazy(() => import("@/pages/form/advanced-form"));

const form: IRouteObject[] = [
  {
    order: 2,
    path: "form",
    title: "表单页",
    icon: <FormOutlined />,
    children: [
      {
        title: "基础表单",
        path: "basic-form",
        element: <BasicForm />,
      },
      {
        title: "分步表单",
        path: "step-form",
        element: <StepForm />,
      },
      {
        title: "高级表单",
        path: "advanced-form",
        element: <AdvancedForm />,
      },
    ],
  },
];

export default form;
