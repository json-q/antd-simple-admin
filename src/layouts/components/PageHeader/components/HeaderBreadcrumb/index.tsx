import { createElement, memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Space } from "antd";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { isArray } from "lodash-es";
import { findCurentRoute } from "@/hooks/useRouteMatch";
import routes, { type IRouter } from "@/routes";

const HeaderBreadcrumb: React.FC = memo(() => {
  const { pathname } = useLocation();

  const genBreadcumbs = useMemo(() => {
    const match = findCurentRoute(pathname, routes);
    if (!match) return [];

    const genBaseBreadcumbs = (treeRoutes: IRouter[], isChildren = false): ItemType[] => {
      return treeRoutes.map((item) => {
        let redirect = item.redirect;
        const title = item.title || item.meta?.title;
        const icon = item.icon ? createElement(item.icon) : null;
        const hasChildren = isArray(item.children) && item.children.length > 0;

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
