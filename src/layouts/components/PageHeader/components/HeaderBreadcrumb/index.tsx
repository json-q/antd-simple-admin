import { createElement, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Space } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { isArray } from "lodash-es";
import { findCurentRoute } from "@/hooks/useRouteMatch";
import routes, { type IRouteObject } from "@/routes";

const HeaderBreadcrumb: React.FC = memo(() => {
  const { pathname } = useLocation();

  const genBreadcumbs = useMemo(() => {
    const match = findCurentRoute(pathname, routes);
    if (!match) return [];

    const genBaseBreadcumbs = (treeRoutes: IRouteObject[], isChildren = false): ItemType[] => {
      return treeRoutes.map((item) => {
        const title = item.title || item.meta?.title;
        const icon = item.icon ? createElement(item.icon) : null;
        const hasChildren = isArray(item.children) && item.children.length > 0;

        const titleBaseEl = (
          <Space>
            {icon && <span>{icon}</span>}
            {title}
          </Space>
        );

        let titleRender: JSX.Element | null = null;
        // dropdown 的点击默认有跳转能力，由于路由渲染时已做自动重定向，这里无需操作
        if (isChildren) titleRender = <Link to={item.path}>{titleBaseEl}</Link>;
        // 平铺的面包屑，无跳转能力，仅 hover pointer
        else if (hasChildren) titleRender = <a>{titleBaseEl}</a>;
        // 一般都是最后一个节点，纯文本
        else titleRender = titleBaseEl;

        const breadcumbsItem: ItemType = {
          key: item.path,
          href: item.path,
          title: titleRender,
        };

        if (hasChildren) {
          breadcumbsItem.menu = { items: genBaseBreadcumbs(item.children!, true) };
        }

        return breadcumbsItem;
      });
    };

    return genBaseBreadcumbs(match.treeMatchRoute);
  }, [pathname, routes]);

  function itemRender(currentRoute: ItemType) {
    // 生成时已完全处理，这里返回仅仅是为了不让 antd 再二次处理
    return currentRoute.title;
  }

  return <Breadcrumb items={genBreadcumbs} itemRender={itemRender} />;
});

export default HeaderBreadcrumb;
