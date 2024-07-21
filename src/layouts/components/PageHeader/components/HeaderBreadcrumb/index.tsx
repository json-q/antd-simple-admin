import { createElement, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Space } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { isArray } from "lodash-es";
import { findCurentRoute } from "@/hooks/useRouteMatch";
import routes, { type IRouter } from "@/routes";

const HeaderBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();

  const getBreadcumbs = useCallback(() => {
    const match = findCurentRoute(pathname, routes);
    if (!match) return [];

    const genBreadcumbsTree = (treeRoutes: IRouter[], isChildren = false): ItemType[] => {
      return treeRoutes.map((item) => {
        const title = item.title || item.meta?.title;
        const icon = item.icon ? createElement(item.icon) : null;
        const hasChildren = item.children && isArray(item.children);

        const titleBaseEl = (
          <Space>
            {icon && <span>{icon}</span>}
            {title}
          </Space>
        );

        /**
         * 这一部分是为了修正无法正确配置 dropdown 路由链接
         * 1. 如果该路由有子路由，则该 title 是一个不能跳转路由的 a 标签，作为 dropdown 的 trigger
         * 2. 如果没有子路由，则分两种情况
         * 2.1. 该路由是本身就是子路由，则归属于 dropdown，需要添加 Link 标签
         * 2.2. 如果该路由不属于 dropdown，也没有子路由，则先以文本渲染，后续交给 itemRender 处理
         */
        const titleRender = hasChildren ? (
          <a>{titleBaseEl}</a>
        ) : (
          <>{isChildren ? <Link to={item.path}>{titleBaseEl}</Link> : titleBaseEl}</>
        );

        const breadcumbsItem: ItemType = {
          href: item.path,
          title: titleRender,
        };

        if (item.children && isArray(item.children)) {
          breadcumbsItem.menu = { items: genBreadcumbsTree(item.children, true) };
        }

        return breadcumbsItem;
      });
    };

    return genBreadcumbsTree(match.treeMatchRoute);
  }, [pathname, routes]);

  function itemRender(currentRoute: ItemType, _param: any, items: ItemType[]) {
    const isLast = currentRoute?.href === items[items.length - 1]?.href;

    // 最后一个是纯文本，items 是 dropdown，已处理，无需二次处理
    if (isLast || currentRoute.menu?.items) return currentRoute.title;

    return <Link to={currentRoute.href!}>{currentRoute.title}</Link>;
  }

  return <Breadcrumb items={getBreadcumbs()} itemRender={itemRender} />;
};

export default HeaderBreadcrumb;
