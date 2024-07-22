import { createElement, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Space } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { isArray } from "lodash-es";
import { findCurentRoute } from "@/hooks/useRouteMatch";
import routes, { type IRouter } from "@/routes";

const HeaderBreadcrumb: React.FC = () => {
  const { pathname } = useLocation();

  const genBreadcumbs = useMemo(() => {
    const match = findCurentRoute(pathname, routes);
    if (!match) return [];

    const genBreadcumbsTree = (treeRoutes: IRouter[], isChildren = false): ItemType[] => {
      return treeRoutes.map((item) => {
        let redirect = item.redirect;
        const title = item.title || item.meta?.title;
        const icon = item.icon ? createElement(item.icon) : null;
        const hasChildren = item.children && isArray(item.children);

        const titleBaseEl = (
          <Space>
            {icon && <span>{icon}</span>}
            {title}
          </Space>
        );

        function addRedirect(multMenu: IRouter[]): string | undefined {
          for (let i = 0; i < multMenu.length; i++) {
            const item = multMenu[i];

            if (item.children && isArray(item.children)) {
              // 递归找到第一个具有路由页面的节点就停止，作为父节点的重定向地址
              const _redirect = addRedirect(item.children);
              if (_redirect) return _redirect;
            }

            if (item.component) return item.path;
          }
        }

        // 有子节点，但是没有声明 redirect 重定向的子节点地址，自动查找第一个具有路由的子节点
        if (hasChildren && !redirect) {
          redirect = addRedirect(item.children!);
        }

        let titleRender: JSX.Element | null = null;
        // dropdown 下拉点击重定向到指定地址（兼容嵌套多层菜单的情况）
        if (isChildren && redirect) titleRender = <Link to={redirect}>{titleBaseEl}</Link>;
        // dropdown 的点击默认有跳转能力
        else if (isChildren) titleRender = <Link to={item.path}>{titleBaseEl}</Link>;
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

  return <Breadcrumb items={genBreadcumbs} itemRender={itemRender} />;
};

export default HeaderBreadcrumb;
