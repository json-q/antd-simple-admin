import { lazy } from "react";
import { TableOutlined } from "@ant-design/icons";
import type { IRouter } from "..";

const list: IRouter[] = [
  {
    path: "/list",
    title: "列表页",
    icon: TableOutlined,
    children: [
      {
        title: "搜索列表",
        path: "/list/search",
        children: [
          {
            title: "搜索列表 (文章)",
            path: "/list/search/articles",
            component: lazy(
              () =>
                import(
                  /* webpackChunkName: "List_Search_Articles" */ "@/pages/list/search/articles"
                ),
            ),
          },
          {
            title: "搜索列表 (项目)",
            path: "/list/search/projects",
            component: lazy(
              () =>
                import(
                  /* webpackChunkName: "List_Search_Projects" */ "@/pages/list/search/projects"
                ),
            ),
          },
          {
            title: "搜索列表 (应用)",
            path: "/list/search/applications",
            component: lazy(
              () =>
                import(
                  /* webpackChunkName: "List_Search_Applications" */ "@/pages/list/search/applications"
                ),
            ),
          },
        ],
      },
      {
        title: "查询表格",
        path: "/list/table-list",
        component: lazy(
          () => import(/* webpackChunkName: "List_TableList" */ "@/pages/list/table-list"),
        ),
      },
      {
        title: "标准列表",
        path: "/list/basic-list",
        component: lazy(
          () => import(/* webpackChunkName: "List_BasicList" */ "@/pages/list/basic-list"),
        ),
      },
      {
        title: "卡片列表",
        path: "/list/card-list",
        component: lazy(
          () => import(/* webpackChunkName: "List_CardList" */ "@/pages/list/card-list"),
        ),
      },
    ],
  },
];

export default list;
