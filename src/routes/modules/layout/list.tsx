import { lazy } from "react";
import { TableOutlined } from "@ant-design/icons";
import type { IRouteObject } from "../..";

const Articles = lazy(() => import("@/pages/list/search/articles"));
const Projects = lazy(() => import("@/pages/list/search/projects"));
const Applications = lazy(() => import("@/pages/list/search/applications"));
const TableList = lazy(() => import("@/pages/list/table-list"));
const BasicList = lazy(() => import("@/pages/list/basic-list"));
const CardList = lazy(() => import("@/pages/list/card-list"));

const list: IRouteObject[] = [
  {
    order: 3,
    path: "list",
    title: "列表页",
    icon: <TableOutlined />,
    children: [
      {
        title: "搜索列表",
        path: "search",
        children: [
          {
            title: "搜索列表 (文章)",
            path: "articles",
            element: <Articles />,
          },
          {
            title: "搜索列表 (项目)",
            path: "projects",
            element: <Projects />,
          },
          {
            title: "搜索列表 (应用)",
            path: "applications",
            element: <Applications />,
          },
        ],
      },
      {
        title: "查询表格",
        path: "table-list",
        element: <TableList />,
      },
      {
        title: "标准列表",
        path: "basic-list",
        element: <BasicList />,
      },
      {
        title: "卡片列表",
        path: "card-list",
        element: <CardList />,
      },
    ],
  },
];

export default list;
