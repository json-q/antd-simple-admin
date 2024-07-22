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
        const { redirect, path } = item;
        const title = item.title || item.meta?.title;
        const icon = item.icon ? createElement(item.icon) : null;
        const hasChildren = item.children && isArray(item.children);

        const titleBaseEl = (
          <Space>
            {icon && <span>{icon}</span>}
            {title}
          </Space>
        );

        let titleRe: JSX.Element | null = null;
        // dropdown 下拉点击重定向到指定地址（兼容嵌套多层菜单的情况）
        if (isChildren && redirect) titleRe = <Link to={redirect}>{titleBaseEl}</Link>;
        // dropdown 的点击默认有跳转能力
        else if (isChildren) titleRe = <Link to={path}>{titleBaseEl}</Link>;
        // 平铺的面包屑，无跳转能力
        else if (hasChildren) titleRe = <a>{titleBaseEl}</a>;
        // 一般都是最后一个节点，纯文本
        else titleRe = titleBaseEl;

        const breadcumbsItem: ItemType = {
          key: path,
          href: path,
          title: titleRe,
        };

        if (hasChildren) {
          breadcumbsItem.menu = { items: genBreadcumbsTree(item.children!, true) };
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
